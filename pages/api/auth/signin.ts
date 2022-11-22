import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
		if (!user) throw new Error("User does not exist.")
		const passwordEncryption = await bcrypt.compare(
			req.body.password,
			user.password
		)
		if (!passwordEncryption) throw new Error("Wrong password entered.")
		const token = jwt.sign(
			{
				email: user.email,
				userId: user.id,
			},
			process.env.SECRET!,
			{ expiresIn: "48h" }
		)
		res
			.setHeader("set-cookie", `name=test2; path=/; samesite=strict; httponly;`)
			.status(200)
			.json({
				data: { userId: user.id, email: user.email, name: user.name },
				token: token,
			})
	} catch (error) {
		const err = error as Error
		res.status(400).json({ message: err.message })
	}
}
