import { FC, FormEvent, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import NewQuestionForm from "../NewQuestionForm/NewQuestionForm"
import NewOptionForm from "../NewOptionForm/NewOptionForm"
import classes from "./FormContainer.module.css"
import EndDateForm from "../EndDateForm/EndDateForm"
import { useAuth } from "../../../context/authContext"

interface FormContainerProps {
	passFormData: ({}) => void
}

const FormContainer: FC<FormContainerProps> = ({ passFormData }) => {
	const { user } = useAuth()
	const [question, setQuestion] = useState("")
	const [securePoll, setSecurePoll] = useState(false)
	const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0])
	const [numOfOptions, setNumOfOptions] = useState(2)
	const [formNumber, setFormNumber] = useState(0)
	const [options, setOptions] = useState<any>({})

	const formComponents = [
		<NewQuestionForm
			checked={securePoll}
			check={() => setSecurePoll(!securePoll)}
			value={question}
			setValue={(e: any) => setQuestion(e.target.value)}
		/>,
		<EndDateForm
			value={endDate}
			setValue={(e) => setEndDate(e.target.value)}
		/>,
		<NewOptionForm
			options={options}
			setOptions={setOptions}
			value={numOfOptions}
			numberOfOptions={numOfOptions}
			addOption={() => {
				if (numOfOptions === 6) return
				setNumOfOptions((prev) => prev + 1)
			}}
			removeOption={() => {
				if (numOfOptions === 2) return
				setNumOfOptions((prev) => prev - 1)
			}}
		/>,
	]

	function onSubmit(e: FormEvent) {
		e.preventDefault()
		nextComponent()
		if (formNumber !== formComponents.length - 1) return
		let optionsArray = []
		for (let x in options) {
			optionsArray.push({ title: options[x] })
		}
		passFormData({
			question,
			secure: securePoll,
			optionLimit: numOfOptions,
			options: optionsArray,
			allowNewOptions: true,
			endsAt: new Date(endDate),
			userId: user?.id,
		})
	}

	function nextComponent() {
		if (formNumber === formComponents.length - 1) return
		setFormNumber((prev) => prev + 1)
	}

	function prevComponent() {
		if (formNumber === 0) return
		setFormNumber((prev) => prev - 1)
	}

	return (
		<form className={classes.form} onSubmit={onSubmit}>
			<AnimatePresence mode={"popLayout"}>
				{formComponents.map((form, index) => {
					if (index === formNumber) {
						return (
							<motion.div
								initial={{ opacity: 0, x: "200%" }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: "-400%" }}
								key={index}
							>
								{form}
							</motion.div>
						)
					}
				})}
			</AnimatePresence>
			<div className={classes.btnGroup}>
				{formNumber !== 0 && (
					<button className="btn" type="button" onClick={prevComponent}>
						Previous
					</button>
				)}
				<button className="btn" type="submit">
					{formNumber !== formComponents.length - 1 ? "Next" : "Submit"}
				</button>
			</div>
		</form>
	)
}

export default FormContainer
