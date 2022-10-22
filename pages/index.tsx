import type { NextPage } from "next"
import Intro from "../components/General/Intro/Intro"

const Home: NextPage = () => {
	return (
		<>
			<div className="homepage">
				<Intro />
			</div>
		</>
	)
}

export default Home

//TODO socketIO
//TODO fix option ui remove colors
//TODO hide results before voting
//TODO check date on different time zones
//TODO check date API on different browsers
//TODO fixer header on mob

//TODO change vote
//TODO add time
//TODO add option to poll creator name

//TODO backend validation for inputs
//TODO frontend validation for inputs

//TODO animations
//TODO add sharing links to social media
//TODO add GAnalytics
//TODO add to portfolio

//TODO CLSX
