import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/General/LoadingSpinner/LoadingSpinner"
import Notification from "../../components/General/Notification/Notification"
import Option from "../../components/Poll/Option/Option"
import OptionContainer from "../../components/Poll/Option/OptionContainer"
import Question from "../../components/Poll/Question/Question"
import { PollQuestion } from "../../utils/types"
import { motion } from "framer-motion"
import Head from "next/head"
// @ts-ignore
import { useChannel } from "@ably-labs/react-hooks"

export default function Poll() {
	const [poll, setPoll] = useState<PollQuestion>()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [notification, setNotification] = useState(false)
	const [voting, setVoting] = useState<null | string>(null)
	const router = useRouter()

	useEffect(() => {
		if (router.isReady) {
			getPoll()
		}
	}, [router.isReady])

	const [channel] = useChannel(`${router.query.id}-channel`, (message: any) => {
		// Add new incoming comment to the list of comments
		setPoll(message.data.poll.data.question)
	})

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
			let err = error as Error
			setLoading(false)
			setError(err.message)
		}
	}

	async function vote(id: string, pollId: string) {
		try {
			setVoting(id)
			if (localStorage.getItem(pollId))
				throw new Error("You have already voted in this poll.")
			const response = await fetch(`/api/option/${id}`, {
				method: "POST",
				body: JSON.stringify({ pollId }),
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})
			const data = await response.json()
			if (!response.ok) throw new Error(data.error)
			localStorage.setItem(pollId, id)
			setVoting(null)
			setNotification(true)
			channel.publish({
				name: "updated-poll",
				data: { poll: data },
			})
			setTimeout(() => {
				setNotification(false)
			}, 3000)
		} catch (error) {
			setVoting(null)
			let err = error as Error
			setError(err.message)
		}
	}

	if (loading) return <LoadingSpinner />

	if (poll)
		return (
			<>
				<Head>
					<meta property="og:title" content="Every Vote Counts!" />
					<meta property="og:description" content={poll.question} />
					<meta property="og:type" content="website" />
					<meta
						property="og:url"
						content={"https://quickpolls.vercel.app" + router.asPath}
					/>
					<meta property="og:image" content="/images/votematters2.jpg" />
				</Head>
				{notification && (
					<Notification
						success={true}
						message={"You have successfully voted in this poll."}
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
				<motion.div
					initial={{ opacity: 0, scale: 4 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4 }}
					className="poll-page"
				>
					<Question
						secure={poll.secure}
						voted={!!localStorage.getItem(poll.id)}
						link={"https://quickpolls.vercel.app" + router.asPath}
						pollQuestion={poll.question}
						totalVotes={poll.totalVotes}
						endDate={poll.endsAt.split("T")[0]}
					/>

					<OptionContainer>
						{poll.options
							.sort((d, a) => ("" + a.id).localeCompare(d.id))
							.map((option, index) => (
								<div
									key={option.id}
									onClick={() => {
										if (voting) return
										vote(option.id, poll.id)
									}}
								>
									<Option
										voting={voting === option.id}
										voted={localStorage.getItem(poll.id) === option.id}
										votedInPoll={!!localStorage.getItem(poll.id)}
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
				</motion.div>
			</>
		)

	if (error)
		return (
			<>
				<Notification
					success={false}
					message={error}
					dismiss={() => setError("")}
				/>
				<div className="poll-page">
					<button className="btn" onClick={() => router.push("/new-poll")}>
						Create New Poll
					</button>
				</div>
			</>
		)
}
