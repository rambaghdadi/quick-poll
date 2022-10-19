import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../db/client"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		// Add New Vote
		if (req.method === "POST") {
			const ip = req.headers["x-real-ip"]?.toString()!
			const numOfVotes = await prisma.pollOption.findFirst({
				where: {
					id: req.body.id,
				},
				select: {
					vote: true,
					question: true,
				},
			})
			if (!numOfVotes) throw new Error("Choice not found.")
			if (numOfVotes.question.voters.includes(ip))
				throw new Error("You have already voted in this poll.")
			const vote = await prisma.pollOption.update({
				where: {
					id: req.body.id,
				},
				data: {
					vote: numOfVotes.vote + 1,
					voters: ip,
					question: {
						update: {
							voters: ip,
							totalVotes: numOfVotes.question.totalVotes + 1,
						},
					},
				},
			})
			res.status(200).json({ data: vote })
		}
	} catch (error) {
		let err = error as Error
		res.status(400).json({ error: err.toString() })
	}
}
