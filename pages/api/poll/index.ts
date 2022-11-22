import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			if (req.body.question.length > 150)
				throw new Error("Only 150 characters are allowed.")
			if (req.body.question.length <= 1)
				throw new Error("More than 2 characters are required.")
			const poll = await prisma.pollQuestion.create({
				data: {
					question: req.body.question,
					secure: req.body.secure,
					allowNewOptions: req.body.allowNewOptions,
					optionLimit: req.body.optionLimit,
					endsAt: req.body.endsAt,
					options: {
						create: req.body.options,
					},

					userId: req.body.userId,
				},
			})
			res.status(200).json({ data: poll })
		} catch (error) {
			let err = error as Error
			res.status(400).json({ error: err.message })
		}
	}
}
