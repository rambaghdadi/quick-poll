// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db/client"

// type Data = {
// 	name: string
// }

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		// Add New Question
		if (req.method === "POST") {
			const poll = await prisma.pollQuestion.create({
				data: {
					question: req.body.question,
					allowNewOptions: req.body.allowNewOptions,
					optionLimit: req.body.optionLimit,
					options: {
						create: req.body.options,
					},
				},
			})
			res.status(200).json({ data: poll })
		}
	} catch (error) {
		let err = error as Error
		res.status(400).json({ error: err })
	}
}
