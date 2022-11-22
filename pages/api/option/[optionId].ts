import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import jwt from "jsonwebtoken"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let signedInUser: any = null
	let decodedToken: any
	let optionId = req.query.optionId as string

	try {
		const authHeader = req.headers.authorization
		if (authHeader) {
			const token = authHeader.split(" ")[1]
			decodedToken = jwt.verify(token, process.env.SECRET!)
			if (decodedToken) {
				signedInUser = decodedToken.userId
			}
		}

		const option = await prisma.pollOption.findFirst({
			where: {
				id: optionId,
			},
			include: {
				question: true,
			},
		})
		if (!option) throw new Error("Choice not found.")

		if (option?.question.secure) {
			if (!signedInUser) throw new Error("You need to be signed in to vote.")
			if (option.question.signedInVoters.includes(signedInUser))
				throw new Error("You have already voted in this poll.")
			const vote = await prisma.pollOption.update({
				where: {
					id: optionId,
				},
				data: {
					vote: option.vote + 1,
					question: {
						update: {
							totalVotes: option.question.totalVotes + 1,
							signedInVoters: {
								push: signedInUser,
							},
						},
					},
				},
				include: {
					question: {
						include: {
							options: true,
						},
					},
				},
			})

			res.status(200).json({ data: vote })
			return
		}

		const vote = await prisma.pollOption.update({
			where: {
				id: optionId,
			},
			data: {
				vote: option.vote + 1,
				question: {
					update: {
						totalVotes: option.question.totalVotes + 1,
					},
				},
			},
			include: {
				question: {
					include: {
						options: true,
					},
				},
			},
		})
		res.status(200).json({ data: vote })
	} catch (error) {
		let err = error as Error
		res.status(400).json({ error: err.message })
	}
}
