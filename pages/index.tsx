import type { NextPage } from "next"
import Intro from "../components/General/Intro/Intro"
import { motion } from "framer-motion"

const Home: NextPage = () => {
	return (
		<>
			<div className="homepage">
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 3 }}
					transition={{ delay: 0.4, duration: 0.4 }}
				>
					<Intro />
				</motion.div>
			</div>
		</>
	)
}

export default Home

//TODO multiple votes
//TODO secure polls option / authentication

//TODO check date on different time zones
//TODO check date API on different browsers

//TODO add time
//TODO add option to poll creator name

//TODO backend validation for inputs

//TODO upgrade server
//TODO get domain name
