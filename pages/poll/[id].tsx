import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/General/LoadingSpinner/LoadingSpinner"
import Option from "../../components/Poll/Option/Option"
import OptionContainer from "../../components/Poll/Option/OptionContainer"
import { PollQuestion } from "../../utils/types"

// interface PollProps {
// 	poll: PollQuestion
// }

export default function Poll() {
	const [poll, setPoll] = useState<PollQuestion | null>(null)
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (router.isReady) {
			getPoll()
		}
	}, [router.isReady])

	async function getPoll() {
		try {
			setLoading(true)
			const response = await fetch(`/api/poll/${router.query.id}`)
			const data = await response.json()
			if (!response.ok) throw new Error(data.error)
			setPoll(data.data)
			setLoading(false)
			console.log(data)
		} catch (error) {
			setLoading(false)

			// setError("Server error, please try again later.")
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

	async function vote(id: string) {
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
			rehydrateUI()
		} catch (error) {
			// setError("Server error, please try again later.")
			console.error(error)
		}
	}

	//TODO unselect and change answer
	//TODO trim percentage

	if (loading) return <LoadingSpinner />

	if (poll)
		return (
			<div>
				<h1>{poll.question}</h1>
				<h1>Total Votes: {poll.totalVotes}</h1>
				<OptionContainer>
					{poll.options.map((option) => (
						<div key={option.id} onClick={() => vote(option.id)}>
							<Option
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
		)
}

// export const getServerSideProps: GetServerSideProps = async (
// 	context: GetServerSidePropsContext
// ) => {
// 	const ip = context.req.headers["x-real-ip"]

// 	console.log(ip)

// 	const poll = await prisma.pollQuestion.findFirst({
// 		where: {
// 			id: context.query.id?.toString(),
// 		},
// 		include: {
// 			options: true,
// 		},
// 	})

// 	if (!poll) {
// 		return {
// 			notFound: true,
// 		}
// 	}

// 	return {
// 		props: {
// 			poll: JSON.parse(JSON.stringify(poll)),
// 			address: ip,
// 		},
// 	}
// }
