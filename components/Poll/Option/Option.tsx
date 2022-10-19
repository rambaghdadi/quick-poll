import { FC } from "react"
import classes from "./Option.module.css"

interface OptionProps {
	title: string
	value: number
	vote: number
	index: number
	voted: boolean
}

const Option: FC<OptionProps> = ({ title, value, vote, index, voted }) => {
	const colors = [
		"rgb(0, 145, 255)",
		"#c92a2a",
		"rgb(8, 127, 91)",
		"#9c36b5",
		"#d9480f",
		"#087f5b",
		"#a61e4d",
		"#5f3dc4",
	]
	const backgroundColors = [
		"rgba(0, 145, 255, 0.3)",
		"rgb(201, 42, 42,0.3)",
		"rgb(8, 127, 91,0.3)",
		"rgb(156, 54, 181,0.3)",
		"rgb(217, 72, 15,0.3)",
		"rgb(8, 127, 91,0.3)",
		"rgb(166, 30, 77,0.3)",
		"rgb(95, 61, 196,0.3)",
	]

	return (
		<div
			style={{
				borderColor: colors[index],
				backgroundColor: voted ? backgroundColors[index] : "",
			}}
			className={classes.main}
		>
			<div className={classes.primarySection}>
				<p className={classes.title}>{title}</p>
				<p className={classes.percentage}>{value}%</p>
			</div>
			<div className={classes.secondarySection}>
				<div className={classes.progressBarContainer}>
					<div
						className={classes.progressBar}
						style={{ backgroundColor: colors[index], width: `${value}%` }}
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
