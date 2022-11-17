import { FC } from "react"
import SharingMenu from "../SharingMenu/SharingMenu"
import classes from "./Question.module.css"

interface QuestionProps {
	pollQuestion: string
	totalVotes: number
	endDate: string
	link: string
	voted: boolean
	secure: boolean
}

const Question: FC<QuestionProps> = ({
	pollQuestion,
	totalVotes,
	endDate,
	secure,
	...QuestionProps
}) => {
	return (
		<div className={classes.container}>
			<p
				className={
					secure
						? `${classes.question} ${classes.secure}`
						: `${classes.question}`
				}
			>
				<span style={{ fontWeight: 400 }}> </span>
				{pollQuestion}
			</p>

			<p className={classes.votes}>Total Votes: {totalVotes}</p>
			<p className={classes.endDate}>End Date: {endDate}</p>
			<SharingMenu {...QuestionProps} />
		</div>
	)
}

export default Question
