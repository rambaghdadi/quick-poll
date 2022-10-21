import { FC } from "react"
import classes from "./Question.module.css"

interface QuestionProps {
	pollQuestion: string
	totalVotes: number
	endDate: string
}

const Question: FC<QuestionProps> = ({ pollQuestion, totalVotes, endDate }) => {
	return (
		<div className={classes.container}>
			<p className={classes.question}>
				<span style={{ fontWeight: 400 }}> </span>
				{pollQuestion}
			</p>
			<p className={classes.votes}>Total Votes: {totalVotes}</p>
			<p className={classes.endDate}>End Date: {endDate}</p>
		</div>
	)
}

export default Question
