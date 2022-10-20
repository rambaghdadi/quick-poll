import { useRouter } from "next/router"
import { FC } from "react"
import classes from "./Intro.module.css"

const Intro: FC = () => {
	const router = useRouter()
	return (
		<div className={classes.main}>
			<h1>Create instant, online, real-time polls</h1>
			<button
				className="btn"
				style={{ padding: "2.5rem", fontSize: "2rem" }}
				onClick={() => {
					router.push("/new-poll")
				}}
			>
				Create New Poll
			</button>
			<p>
				No registration required. It's 100% free and takes less than a minute.
			</p>
		</div>
	)
}

export default Intro
