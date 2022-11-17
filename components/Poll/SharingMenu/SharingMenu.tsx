import { FC, useState } from "react"
import {
	BrandFacebook,
	BrandLinkedin,
	BrandTwitter,
	Share,
} from "tabler-icons-react"
import classes from "./SharingMenu.module.css"

interface SharingMenuProps {
	link: string
	voted: boolean
}

const SharingMenu: FC<SharingMenuProps> = ({ link, voted }) => {
	const [copiedURL, setCopiedURL] = useState(false)

	const socials = [
		{
			href: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
			btnColor: "#4267B2",
			btnText: "Share",
			icon: (
				<BrandFacebook
					size={20}
					fill={"white"}
					strokeWidth={1}
					color={"white"}
				/>
			),
		},
		{
			href: `https://twitter.com/intent/tweet?text=Take%20part%20in%20this%20poll%20${link}`,
			btnColor: "#1DA1F2",
			btnText: "Tweet",
			icon: (
				<BrandTwitter
					size={20}
					fill={"white"}
					strokeWidth={1}
					color={"white"}
				/>
			),
		},
		{
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
			btnColor: "#0077B5",
			btnText: "Share",
			icon: <BrandLinkedin size={20} strokeWidth={2} color={"white"} />,
		},
	]

	function copyLink() {
		setCopiedURL(false)
		if (link) {
			navigator.clipboard.writeText(link)
			setCopiedURL(true)
		}
		setTimeout(() => {
			setCopiedURL(false)
		}, 2000)
	}

	if (voted)
		return (
			<div className={classes.container}>
				<p>Share this poll</p>
				<div className={classes.btnContainer}>
					<button
						style={{ backgroundColor: copiedURL ? "rgb(8, 127, 91)" : "" }}
						onClick={copyLink}
						className={classes.socialBtn}
					>
						<div className={classes.btnSeparator}>
							<Share size={20} fill={"white"} strokeWidth={1} color={"white"} />
							<span>Link</span>
						</div>
					</button>

					{socials.map((button, i) => (
						<a
							key={i}
							href={button.href}
							target="_blank"
							className={classes.socialBtn}
							style={{ backgroundColor: button.btnColor }}
						>
							<div className={classes.btnSeparator}>
								{button.icon}
								{button.btnText}
							</div>
						</a>
					))}
				</div>
			</div>
		)

	return null
}

export default SharingMenu
