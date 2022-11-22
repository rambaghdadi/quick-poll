import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "../../../context/authContext"
import classes from "./Navbar.module.css"
import { Menu2, X } from "tabler-icons-react"

export default function Navbar() {
	const router = useRouter()
	const [navOpen, setNavOpen] = useState(false)
	const { user, signOut } = useAuth()

	let navbarClass = navOpen
		? `${classes.navbar} ${classes.navbarOpen}`
		: `${classes.navbar}`

	return !router.asPath.includes("auth") ? (
		<>
			{user &&
				(navOpen ? (
					<X
						className={classes.menuIcon}
						onClick={() => setNavOpen(!navOpen)}
					/>
				) : (
					<Menu2
						className={classes.menuIcon}
						onClick={() => setNavOpen(!navOpen)}
					/>
				))}

			{user && (
				<nav className={navbarClass}>
					<ul>
						{!router.asPath.includes("/dashboard") && (
							<Link href={"/dashboard"}>
								<a onClick={() => setNavOpen(!navOpen)}>Dashboard</a>
							</Link>
						)}
						<p
							onClick={() => {
								setNavOpen(!navOpen)
								signOut()
							}}
						>
							Sign Out
						</p>
					</ul>
				</nav>
			)}

			{!user && (
				<div className={classes.signInContainer}>
					<button
						style={{ backgroundColor: "rgb(8, 127, 91)" }}
						onClick={() =>
							router.push({
								pathname: "/auth/signin",
								query: { from: router.asPath },
							})
						}
						className={`${classes.signInBtn} btn`}
					>
						Sign In
					</button>
					<div className={classes.cta}>
						<div className={classes.arrow}>
							<p>Secure polls!</p>
						</div>
					</div>
				</div>
			)}
		</>
	) : null
}
