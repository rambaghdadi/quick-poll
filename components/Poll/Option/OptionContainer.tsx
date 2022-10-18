import classes from "./OptionContainer.module.css"

export default function OptionContainer(props: any) {
	return <div className={classes.container}>{props.children}</div>
}
