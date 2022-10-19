import { FC } from "react"
import classes from "./Question.module.css"

interface QuestionProps {
	pollQuestion: string
	totalVotes: number
}

const Question: FC<QuestionProps> = ({ pollQuestion, totalVotes }) => {
	return (
		<div className={classes.container}>
			<p className={classes.question}>
				<span style={{ fontWeight: 400 }}> </span>
				{pollQuestion}
			</p>
			<p className={classes.votes}>Total Votes: {totalVotes}</p>
		</div>
	)
}

export default Question
