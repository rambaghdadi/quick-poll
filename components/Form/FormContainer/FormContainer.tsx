import { FC, FormEvent, useState } from "react"
import NewQuestionForm from "../NewQuestionForm/NewQuestionForm"
import NewOptionForm from "../NewOptionForm/NewOptionForm"
import classes from "./FormContainer.module.css"

interface FormContainerProps {
	passFormData: ({}) => void
}

const FormContainer: FC<FormContainerProps> = ({ passFormData }) => {
	const [question, setQuestion] = useState("")
	const [numOfOptions, setNumOfOptions] = useState(2)
	const [formNumber, setFormNumber] = useState(0)
	const [options, setOptions] = useState<any>({})

	const formComponents = [
		<NewQuestionForm
			value={question}
			setValue={(e: any) => setQuestion(e.target.value)}
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
			// setValue={(e) => setNumOfOptions(e.target.valueAsNumber)}
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
			optionLimit: numOfOptions,
			options: optionsArray,
			allowNewOptions: true,
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
			{formComponents.map((form, index) => {
				if (index === formNumber) {
					return <div key={index}>{form}</div>
				}
			})}
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
