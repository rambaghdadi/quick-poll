import { useEffect, useState } from "react"
import MainSection from "../components/Dashboard/MainSection/MainSection"
import Poll from "../components/Dashboard/Poll/Poll"
import LoadingSpinner from "../components/General/LoadingSpinner/LoadingSpinner"
import Notification from "../components/General/Notification/Notification"
import { useAuth } from "../context/authContext"
import { PollQuestion } from "../utils/types"

export default function Dashboard() {
	const [userPolls, setUserPolls] = useState<PollQuestion[] | []>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const { user } = useAuth()

	useEffect(() => {
		getUserPolls()
	}, [])

	async function getUserPolls() {
		try {
			setError("")
			setLoading(true)
			const response = await fetch(`/api/poll/user/polls`, {
				credentials: "include",
			})
			const data = await response.json()
			if (!response.ok) throw new Error(data.message)
			setUserPolls(data.data)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			const err = error as Error
			setError(err.message)
		}
	}

	if (loading) return <LoadingSpinner />

	if (userPolls.length === 0)
		return (
			<>
				{error && (
					<Notification
						success={false}
						message={error}
						dismiss={() => setError("")}
					/>
				)}
				<p>{user?.name?.split(" ")[0]}, you do not have any active polls.</p>
			</>
		)

	return (
		<>
			{error && (
				<Notification
					success={false}
					message={error}
					dismiss={() => setError("")}
				/>
			)}
			<div className="dashboard-page">
				<MainSection />
				<div className="parentContainer">
					<div className="sectionContainer">
						<h1>
							Active Polls (
							{
								userPolls.filter(
									(poll) =>
										new Date(poll.endsAt) >=
										new Date(new Date().toISOString().split("T")[0])
								).length
							}
							)
						</h1>
						<Poll userPolls={userPolls} active={true} />
					</div>
					<div className="sectionContainer">
						<h1>
							Expired Polls (
							{
								userPolls.filter(
									(poll) =>
										new Date(poll.endsAt) <
										new Date(new Date().toISOString().split("T")[0])
								).length
							}
							){" "}
						</h1>
						<Poll userPolls={userPolls} active={false} />
					</div>
				</div>
			</div>
		</>
	)
}

//TODO add sharing menu
