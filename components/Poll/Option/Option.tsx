import { FC } from "react"
import classes from "./Option.module.css"

interface OptionProps {
	title: string
	value: number
	vote: number
	index: number
	voted: boolean
	votedInPoll: boolean
}

const Option: FC<OptionProps> = ({
	title,
	value,
	vote,
	index,
	voted,
	votedInPoll,
}) => {
	const colors = [
		"rgb(0, 145, 255)",
		// "#d9480f",
		// "rgb(8, 127, 91)",
		// "#9c36b5",
		// "#ffe600",
		// "#a61e4d",
		// "#5f3dc4",
		// "#c92a2a",
	]
	const backgroundColors = [
		"rgba(0, 145, 255, 0.3)",
		// "rgba(217, 72, 15,0.3)",
		// "rgba(8, 127, 91,0.3)",
		// "rgba(156, 54, 181,0.3)",
		// "rgba(8, 127, 91,0.3)",
		// "rgba(166, 30, 77,0.3)",
		// "rgba(95, 61, 196,0.3)",
		// "rgba(201, 42, 42,0.3)",
	]

	if (!votedInPoll) {
		return (
			<div style={{ padding: "2rem" }} className={`${classes.main}`}>
				<div className={classes.primarySection}>
					<p className={classes.title}>{title}</p>
				</div>
			</div>
		)
	}

	return (
		<div
			style={{
				backgroundColor: voted ? backgroundColors[0] : "",
			}}
			className={`${classes.main} ${classes.mainVoted}`}
		>
			<div className={classes.primarySection}>
				<p className={classes.title}>{title}</p>
				<p className={classes.percentage}>{value}%</p>
			</div>
			<div className={classes.secondarySection}>
				<div className={classes.progressBarContainer}>
					<div
						className={classes.progressBar}
						style={{ backgroundColor: colors[0], width: `${value}%` }}
					></div>
				</div>
				<p className={classes.vote}>
					{vote} {vote === 1 ? "vote" : "votes"}
				</p>
			</div>
		</div>
	)
}

export default Option
