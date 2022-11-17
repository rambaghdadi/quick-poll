import Link from "next/link"
import classes from "./MainSection.module.css"

export default function MainSection({ username }: { username?: string }) {
	return (
		<main className={classes.section}>
			<h1>Dashboard</h1>
			<p>
				View your polls below, or create a new one by clicking{" "}
				<Link href="/new-poll">
					<a>
						<strong>here</strong>
					</a>
				</Link>
				.
			</p>
		</main>
	)
}
