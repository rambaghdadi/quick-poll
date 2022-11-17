import type { NextPage } from "next"
import Intro from "../components/General/Intro/Intro"
import { motion } from "framer-motion"

const Home: NextPage = () => {
	return (
		<div className="page-container">
			<motion.div
				animate={{ opacity: 1, scale: 1 }}
				initial={{ opacity: 0, scale: 3 }}
				transition={{ delay: 0.4, duration: 0.4 }}
			>
				<Intro />
			</motion.div>
		</div>
	)
}

export default Home

//TODO add password
//TODO check date on different time zones
//TODO add time
//TODO add option to poll creator name

//TODO upgrade server
//TODO get domain name
