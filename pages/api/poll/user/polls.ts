import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/prisma"
import jwt from "jsonwebtoken"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let errorStatus = 500
	let decodedToken: any
	let secret = process.env.SECRET!

	try {
		let user
		const { token } = req.cookies
		if (!token) {
			errorStatus = 401
			throw new Error("Not Authenticated")
		}

		decodedToken = jwt.verify(token, secret)
		if (!decodedToken) {
			errorStatus = 401
			throw new Error("Not authenticated.")
		}
		user = decodedToken.userId as string

		const poll = await prisma.pollQuestion.findMany({
			where: {
				userId: user,
			},
			include: {
				options: true,
			},
		})
		res.status(200).json({ data: poll })
	} catch (error) {
		let err = error as Error
		res.status(400).json({ message: err.message })
	}
}
