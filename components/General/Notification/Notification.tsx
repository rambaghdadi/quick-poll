import { motion } from "framer-motion"
import { FC } from "react"
import { X } from "tabler-icons-react"
import classes from "./Notification.module.css"

interface NotificationProps {
	success: boolean
	message: string
	dismiss: () => void
}

const Notification: FC<NotificationProps> = ({ success, message, dismiss }) => {
	let color = success ? "rgb(8, 127, 91)" : "red"
	let headline = success ? "Success" : "Error"

	return (
		<motion.div
			initial={{ opacity: 0, x: "100%" }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: "100%" }}
			transition={{ type: "tween", duration: 0.1 }}
			className={classes.container}
		>
			<div
				style={{ backgroundColor: color }}
				className={classes.notificationColor}
			></div>
			<div className={classes.textGroup}>
				<p>{headline}</p>
				<p className={classes.message}>{message}</p>
			</div>
			<div onClick={dismiss} className={classes.notificationX}>
				<X size={20} strokeWidth={1} />
			</div>
		</motion.div>
	)
}

export default Notification
