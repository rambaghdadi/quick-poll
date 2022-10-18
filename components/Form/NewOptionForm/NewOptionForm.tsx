import { FC, useState } from "react"
import NewInputOption from "../NewInputOption/NewInputOption"
import classes from "./NewOptionForm.module.css"

interface NewOptionFormProps {
	// setValue: (e: any) => void
	setOptions: (e: any) => void
	value: number
	options: any
	addOption: () => void
	removeOption: () => void
	numberOfOptions: number
}

const NewOptionForm: FC<NewOptionFormProps> = ({
	// setValue,
	value,
	setOptions,
	options,
	...props
}) => {
	return (
		<div className={classes.container}>
			{new Array(value).fill(0).map((_, index) => {
				return (
					<NewInputOption
						option={options?.index}
						key={index}
						index={index}
						setOptions={setOptions}
						{...props}
					/>
				)
			})}
		</div>
	)
}

export default NewOptionForm
