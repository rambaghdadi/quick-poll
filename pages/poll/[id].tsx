import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/General/LoadingSpinner/LoadingSpinner"
import Notification from "../../components/General/Notification/Notification"
import Option from "../../components/Poll/Option/Option"
import OptionContainer from "../../components/Poll/Option/OptionContainer"
import Question from "../../components/Poll/Question/Question"
import { PollQuestion } from "../../utils/types"

// interface PollProps {
// 	poll: PollQuestion
// }

export default function Poll() {
	const [poll, setPoll] = useState<PollQuestion | null>(null)
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [notification, setNotification] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (router.isReady) {
			getPoll()
		}
	}, [router.isReady])

	async function getPoll() {
		try {
			setError("")
			setLoading(true)
			const response = await fetch(`/api/poll/${router.query.id}`)
			const data = await response.json()
			if (!response.ok) throw new Error(data.error)
			setPoll(data.data)
			setLoading(false)
		} catch (error) {
			setLoading(false)

			setError("Server error, please try again later.")
			console.error(error)
		}
	}

	async function rehydrateUI() {
		try {
			const response = await fetch(`/api/poll/${router.query.id}`)
			const data = await response.json()
			if (!response.ok) throw new Error(data.error)
			setPoll(data.data)
		} catch (error) {
			console.error(error)
		}
	}

	async function vote(id: string, pollId: string) {
		try {
			const response = await fetch(`/api/option`, {
				method: "POST",
				body: JSON.stringify({ id }),
				headers: {
					"Content-Type": "application/json",
				},
			})
			const data = await response.json()
			if (!response.ok) throw new Error(data.error)
			localStorage.setItem(pollId, id)
			rehydrateUI()
			setNotification(true)
			setTimeout(() => {
				setNotification(false)
			}, 3000)
		} catch (error) {
			let err = error as Error
			setError(err.toString().split(":")[2].trim())
		}
	}

	//TODO unselect and change answer
	//TODO trim percentage

	if (loading) return <LoadingSpinner />

	if (poll)
		return (
			<>
				{notification && (
					<Notification
						success={true}
						message={"You have successfully voted in this poll."}
						dismiss={() => setError("")}
					/>
				)}
				{error && (
					<Notification
						success={false}
						message={error}
						dismiss={() => setError("")}
					/>
				)}
				<div className="poll-page">
					<Question pollQuestion={poll.question} totalVotes={poll.totalVotes} />
					<OptionContainer>
						{poll.options
							.sort((d, a) => ("" + a.id).localeCompare(d.id))
							.map((option, index) => (
								<div key={option.id} onClick={() => vote(option.id, poll.id)}>
									<Option
										voted={localStorage.getItem(poll.id) === option.id}
										index={index}
										title={option.title}
										vote={option.vote}
										value={
											Number.isNaN((option.vote / poll.totalVotes) * 100)
												? 0
												: Math.round((option.vote / poll.totalVotes) * 100)
										}
									/>
								</div>
							))}
					</OptionContainer>
				</div>
			</>
		)
}
