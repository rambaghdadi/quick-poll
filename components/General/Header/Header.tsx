import { useRouter } from "next/router"
import { FC } from "react"
import classes from "./Header.module.css"

const Header: FC = () => {
	const router = useRouter()

	return (
		<header className={classes.header}>
			<div className={classes.logo} onClick={() => router.push("/")}>
				<img src="/images/poll.png" alt="logo" />
				<p>Quick Polls</p>
			</div>
		</header>
	)
}

export default Header
