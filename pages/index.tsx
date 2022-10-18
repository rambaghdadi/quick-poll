import type { NextPage } from "next"
import Intro from "../components/General/Intro/Intro"
import Notification from "../components/General/Notification/Notification"

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
