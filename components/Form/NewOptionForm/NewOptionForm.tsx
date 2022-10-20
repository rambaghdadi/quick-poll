import { FC, useState } from "react"
import NewInputOption from "../NewInputOption/NewInputOption"
import classes from "./NewOptionForm.module.css"

interface NewOptionFormProps {
	setOptions: (e: any) => void
	value: number
	options: any
	addOption: () => void
	removeOption: () => void
	numberOfOptions: number
}

const NewOptionForm: FC<NewOptionFormProps> = ({
	value,
	setOptions,
	options,
	...props
}) => {
	return (
		<>
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
		</>
	)
}

export default NewOptionForm
