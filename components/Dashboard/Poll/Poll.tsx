import { useRouter } from "next/router"
import { PollQuestion } from "../../../utils/types"
import classes from "./Poll.module.css"

export default function Poll({
	userPolls,
	active,
}: {
	userPolls: PollQuestion[]
	active: boolean
}) {
	const router = useRouter()

	return (
		<div className={classes.container}>
			{userPolls
				.filter((poll: PollQuestion) => {
					if (active)
						return (
							new Date(poll.endsAt) >=
							new Date(new Date().toISOString().split("T")[0])
						)
					if (!active)
						return (
							new Date(poll.endsAt) <
							new Date(new Date().toISOString().split("T")[0])
						)
				})
				.map((poll: PollQuestion) => (
					<div
						style={{ cursor: active ? "pointer" : "auto" }}
						className={classes.pollDetails}
						key={poll.id}
						onClick={() => {
							if (active) router.push(`/poll/${poll.id}`)
						}}
					>
						<div className={classes.pollQuestion}>
							<p className={classes.question}>{poll.question}</p>
							<div className={classes.secondaryDetails}>
								<p style={{ marginBottom: "0.5rem" }}>
									Total Votes: {poll.totalVotes}
								</p>
								<p>
									Created:{" "}
									{poll.createdAt.split("T")[0].split("-").reverse().join("-")}
								</p>
								<p>
									End Date:{" "}
									{poll.endsAt.split("T")[0].split("-").reverse().join("-")}
								</p>
							</div>
						</div>

						<div className={classes.pollOptions}>
							{poll.options.map((option, i) => (
								<div key={i}>
									<div className={classes.optionContainer}>
										<p>{option.title}</p>
										<p>
											{poll.totalVotes !== 0
												? ((option.vote / poll.totalVotes) * 100).toFixed(0)
												: 0}
											%
										</p>
										<div
											style={{
												width:
													poll.totalVotes !== 0
														? `${(
																(option.vote / poll.totalVotes) *
																100
														  ).toFixed(0)}%`
														: "0%",
											}}
											className={classes.percentageBar}
										></div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
		</div>
	)
}
