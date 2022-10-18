// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db/client"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		// Get Specific Poll
		if (req.method === "GET") {
			const pollId = req.query.pollId?.toString()
			const poll = await prisma.pollQuestion.findFirst({
				where: {
					id: pollId,
				},
				include: {
					options: true,
				},
			})
			if (!poll) throw new Error("Poll not found.")
			res.status(200).json({ data: poll })
		}
	} catch (error) {
		let err = error as Error
		res.status(400).json({ error: err })
	}
}
