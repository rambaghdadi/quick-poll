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
