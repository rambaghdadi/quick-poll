import classes from "./LoadingSpinner.module.css"

export default function LoadingSpinner() {
	return (
		<div className={classes["lds-facebook"]}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
