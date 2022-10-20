import Link from "next/link"
import { FC } from "react"
import classes from "./PollUrl.module.css"

interface PollUrlProps {
	link: string
	copyLink: () => void
	resetLink: () => void
	copiedURL: boolean
}

const PollUrl: FC<PollUrlProps> = ({
	link,
	copyLink,
	copiedURL,
	resetLink,
}) => {
	return (
		<div className={classes.container}>
			<div className={classes.linkBox}>
				<Link href={link}>
					<p className={classes.link}>{link}</p>
				</Link>
				<button
					className={
						copiedURL
							? `btn ${classes.btnCopy} ${classes.btnCopied}`
							: `btn ${classes.btnCopy}`
					}
					onClick={copyLink}
				>
					{copiedURL ? `Copied` : `Copy url`}
				</button>
			</div>
			<button onClick={resetLink} className="btn">
				Start new poll
			</button>
		</div>
	)
}

export default PollUrl
