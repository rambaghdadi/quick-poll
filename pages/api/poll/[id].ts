import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let pollId = req.query.id as string

	try {
		const poll = await prisma.pollQuestion.findFirst({
			where: {
				id: pollId,
			},
			include: {
				options: true,
			},
		})
		if (poll?.endsAt.toLocaleDateString()! < new Date().toLocaleDateString())
			throw new Error("Poll expired.")
		if (!poll) throw new Error("Poll not found.")
		res.status(200).json({ data: poll })
	} catch (error) {
		let err = error as Error
		res.status(400).json({ error: err.message })
	}
}
