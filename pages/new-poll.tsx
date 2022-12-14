import { NextPage } from "next"
import { useEffect } from "react"
import { useState } from "react"
import FormContainer from "../components/Form/FormContainer/FormContainer"
import LoadingSpinner from "../components/General/LoadingSpinner/LoadingSpinner"
import Notification from "../components/General/Notification/Notification"
import PollUrl from "../components/PollUrl/PollUrl"

export const NewPoll: NextPage = () => {
	const [link, setLink] = useState<null | string>(null)
	const [error, setError] = useState<null | string>(null)
	const [notification, setNotification] = useState(false)
	const [loading, setLoading] = useState(false)
	const [copiedURL, setCopiedURL] = useState(false)

	async function submitPoll(formData: any) {
		setCopiedURL(false)
		setError(null)
		setLoading(true)
		try {
			const response = await fetch(`/api/poll`, {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			})
			const data = await response.json()
			setLink(
				`${
					process.env.NODE_ENV === "development"
						? "http://localhost:3000"
						: "https://quickpolls.vercel.app"
				}/poll/${data.data.id}`
			)
			setNotification(true)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			setError("Server error, please try again later.")
			console.error(error)
		}
	}

	function copyLink() {
		setCopiedURL(false)
		if (link) {
			navigator.clipboard.writeText(link)
			setCopiedURL(true)
		}
		setTimeout(() => {
			setCopiedURL(false)
		}, 2000)
	}

	if (loading) return <LoadingSpinner />

	return (
		<>
			{notification && (
				<Notification
					success={true}
					message={"Your poll has been created!"}
					dismiss={() => setNotification(false)}
				/>
			)}
			{error && (
				<Notification
					success={false}
					message={error}
					dismiss={() => setError("")}
				/>
			)}
			<div className="new-poll-page">
				{!link && <FormContainer passFormData={submitPoll} />}
				{link && (
					<PollUrl
						copiedURL={copiedURL}
						copyLink={copyLink}
						link={link}
						resetLink={() => setLink(null)}
					/>
				)}
			</div>
		</>
	)
}

export default NewPoll
