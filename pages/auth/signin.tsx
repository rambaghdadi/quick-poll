import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import SignInForm from "../../components/Authentication/SignInForm"
import Notification from "../../components/General/Notification/Notification"
import { useAuth } from "../../context/authContext"

export default function SignIn() {
	const { user, signIn } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (user) router.replace("/")
	})

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
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const data = await response.json()
			if (!response.ok) throw new Error(data.message)
			signIn(data.data.userId, data.data.email, data.data.name, data.token)
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
