import { FC } from "react"
import { useAuth } from "../../../context/authContext"
import classes from "./NewQuestionForm.module.css"

interface NewQuestionFormProps {
	setValue: (e: any) => void
	value: string
	checked: boolean
	check: () => void
}

const NewQuestionForm: FC<NewQuestionFormProps> = ({
	setValue,
	value,
	checked,
	check,
}) => {
	const { user } = useAuth()
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
			{user && (
				<label className={classes.checkboxLabel}>
					<input type="checkbox" onChange={check} checked={checked} />
					Enable "Login to Vote"
				</label>
			)}
		</div>
	)
}

export default NewQuestionForm
