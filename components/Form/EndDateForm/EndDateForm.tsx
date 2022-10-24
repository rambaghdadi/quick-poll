import { FC } from "react"
import classes from "./EndDateForm.module.css"

interface EndDateFormProps {
	setValue: (e: any) => void
	value: string
}

const EndDateForm: FC<EndDateFormProps> = ({ value, setValue }) => {
	return (
		<div className={classes.container}>
			<label className={classes.textLabel} htmlFor="new-date">
				Enter poll end date
			</label>
			<input
				autoFocus
				className={classes.dateInput}
				required
				value={value}
				onChange={setValue}
				type="date"
				name="new-date"
				id="new-date"
				min={new Date().toISOString().split("T")[0]}
			/>
		</div>
	)
}

export default EndDateForm
