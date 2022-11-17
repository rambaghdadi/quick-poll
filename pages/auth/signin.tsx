import { GetServerSidePropsContext } from "next"
import { useState } from "react"
import SignInForm from "../../components/Authentication/SignInForm"
import Notification from "../../components/General/Notification/Notification"
import { useAuth } from "../../context/authContext"

export default function SignIn() {
	const { signIn } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	async function sendDataHandler(formData: {}) {
		try {
			setError("")
			setLoading(true)
			const response = await fetch(
				`${
					process.env.NODE_ENV === "development"
						? "http://localhost:4000"
						: "https://quickpolls-backend.onrender.com"
				}/api/signin`,
				{
					method: "POST",
					credentials: "include",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const data = await response.json()
			if (!response.ok) throw new Error(data.message)
			signIn(data.data.userId, data.data.email, data.data.name)
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
			<div className="sign-in-page">
				<SignInForm sendData={sendDataHandler} loading={loading} />
			</div>
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const cookie = ctx.req.cookies.userToken

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
