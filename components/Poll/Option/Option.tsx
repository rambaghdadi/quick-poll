import { FC } from "react"
import classes from "./Option.module.css"

interface OptionProps {
	title: string
	value: number
	vote: number
}

const Option: FC<OptionProps> = ({ title, value, vote }) => {
	return (
		<div className={classes.main}>
			<div className={classes.primarySection}>
				<p className={classes.title}>{title}</p>
				<p className={classes.percentage}>{value}%</p>
			</div>
			<div className={classes.secondarySection}>
				<progress value={value} max={100}></progress>
				<p className={classes.vote}>
					{vote} {vote === 1 ? "vote" : "votes"}
				</p>
			</div>
		</div>
	)
}

export default Option
