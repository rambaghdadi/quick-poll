import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useState } from "react"
import classes from "./Intro.module.css"

const Intro: FC = () => {
	const router = useRouter()
	return (
		<motion.div
			initial={{ x: "400%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ type: "tween", delay: 0.3, duration: 0.1 }}
			className={classes.main}
		>
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
		</motion.div>
	)
}

export default Intro
