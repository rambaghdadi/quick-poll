import { useRouter } from "next/router"
import Navbar from "../Navbar/Navbar"
import classes from "./Header.module.css"

export default function Header() {
	const router = useRouter()

	return (
		<header className={classes.header}>
			<div className={classes.logo} onClick={() => router.push("/")}>
				<div className={classes.img}></div>
				<p>Quick Polls</p>
			</div>

			<Navbar />
		</header>
	)
}
