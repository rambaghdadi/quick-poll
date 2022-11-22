import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		res.setHeader(
			"Set-Cookie",
			"token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
		)
		res.status(200).json({ message: "User cleared." })
	} catch (error) {
		res.status(400).json({ message: "Please try again later." })
	}
}
