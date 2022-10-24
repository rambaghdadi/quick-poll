import { FC } from "react"
import classes from "./NewQuestionForm.module.css"

interface NewQuestionFormProps {
	setValue: (e: any) => void
	value: string
}

const NewQuestionForm: FC<NewQuestionFormProps> = ({ setValue, value }) => {
	return (
		<div className={classes.container}>
			<label className={classes.textLabel} htmlFor="new-question">
				Enter poll question
			</label>
			<input
				className={classes.textInput}
				maxLength={150}
				minLength={2}
				required
				value={value}
				onChange={setValue}
				name="new-question"
				id="new-question"
			/>
		</div>
	)
}

export default NewQuestionForm
