import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FC } from "react"
import classes from "./Header.module.css"

const Header: FC = () => {
	const [darkMode, setDarkMode] = useState<boolean>()
	const router = useRouter()

	useEffect(() => {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", function (e) {
				setDarkMode(e.matches)
			})
	}, [])

	return (
		<header className={classes.header}>
			<div className={classes.logo} onClick={() => router.push("/")}>
				<img
					src={`/images/${darkMode ? "pollingDark" : "pollingWhite"}.png`}
					alt="logo"
				/>
				<p>Quick Polls</p>
			</div>
		</header>
	)
}

export default Header
