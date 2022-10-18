import { FC } from "react"
import { CircleMinus, CirclePlus } from "tabler-icons-react"
import classes from "./NewInputOption.module.css"

interface NewInputOptionProps {
	setOptions: (option: {}) => void
	option: string
	index: number
	numberOfOptions: number
	addOption: () => void
	removeOption: () => void
}

const NewInputOption: FC<NewInputOptionProps> = ({
	setOptions,
	index,
	option,
	addOption,
	removeOption,
	numberOfOptions,
}) => {
	return (
		<>
			<label className={classes.textLabel}>Option {index + 1}</label>
			<div className={classes.mainInput}>
				<input
					className={classes.textInput}
					value={option}
					onChange={(e) => {
						setOptions((prev: {}) => {
							return {
								...prev,
								[index]: e.target.value,
							}
						})
					}}
					required
				/>
				{numberOfOptions === index + 1 && (
					<div className={classes.addOrRemoveContainer}>
						{numberOfOptions < 8 && (
							<CirclePlus
								onClick={addOption}
								size={30}
								strokeWidth={1}
								color={"white"}
							/>
						)}
						{numberOfOptions > 2 && (
							<CircleMinus
								onClick={removeOption}
								size={30}
								strokeWidth={1}
								color={"white"}
							/>
						)}
					</div>
				)}
			</div>
		</>
	)
}

export default NewInputOption