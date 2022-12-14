import { GetServerSidePropsContext } from "next"
import { useState } from "react"
import SignUpForm from "../../components/Authentication/SignUpForm"
import Notification from "../../components/General/Notification/Notification"
import { useAuth } from "../../context/authContext"

export default function SignUp() {
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { signUp } = useAuth()

	async function sendDataHandler(formData: {}) {
		try {
			setError("")
			setLoading(true)
			const response = await fetch(`/api/auth/signup`, {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			})
			const data = await response.json()
			if (!response.ok) throw new Error(data.message)
			signUp()
			setLoading(false)
		} catch (error) {
			setLoading(false)
			const err = error as Error
			setError(err.message)
		}
	}

	return (
		<>
			{error && (
				<Notification
					success={false}
					message={error}
					dismiss={() => setError("")}
				/>
			)}
			<div>
				<SignUpForm sendData={sendDataHandler} loading={loading} />
			</div>
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const cookie = ctx.req.cookies.token

	if (!cookie)
		return {
			props: {},
		}
	if (cookie) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		}
	}
}
