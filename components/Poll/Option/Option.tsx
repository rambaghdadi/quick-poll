import { FC } from "react"
import classes from "./Option.module.css"
import { motion } from "framer-motion"

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
	const colors = ["rgb(0, 145, 255)"]
	const backgroundColors = ["rgba(0, 145, 255, 0.3)"]

	return (
		<motion.div
			initial={{ opacity: 0, x: "200%" }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: index * 0.1, duration: 0.2 }}
			style={{
				backgroundColor: voted ? backgroundColors[0] : "",
			}}
			className={
				votedInPoll ? `${classes.main} ${classes.mainVoted}` : classes.main
			}
		>
			<div className={classes.primarySection}>
				<p className={classes.title}>{title}</p>
				{votedInPoll && <p className={classes.percentage}>{value}%</p>}
			</div>
			{votedInPoll && (
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
			)}
		</motion.div>
	)
}

export default Option
