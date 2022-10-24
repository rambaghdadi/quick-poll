import { AnimatePresence, motion } from "framer-motion"
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
		<div style={{ marginTop: "2rem" }}>
			<AnimatePresence mode={"popLayout"}>
				{new Array(value).fill(0).map((_, index) => {
					return (
						<motion.div
							initial={{ opacity: 0, y: "-50%" }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: "-100%" }}
							transition={{ type: "tween" }}
							key={index}
						>
							<NewInputOption
								option={options?.index}
								key={index}
								index={index}
								setOptions={setOptions}
								{...props}
							/>
						</motion.div>
					)
				})}
			</AnimatePresence>
		</div>
	)
}

export default NewOptionForm
