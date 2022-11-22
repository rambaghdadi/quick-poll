import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import bcrypt from "bcryptjs"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		})
		if (user) throw new Error("User already exists.")
		const hashedPassword = await bcrypt.hash(req.body.password, 12)
		const newUser = await prisma.user.create({
			data: {
				email: req.body.email,
				password: hashedPassword,
				name: req.body.name,
			},
		})
		res.status(200).json({ message: "User created.", data: newUser })
	} catch (error) {
		const err = error as Error
		res.status(400).json({ message: err.message })
	}
}
