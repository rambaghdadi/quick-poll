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
//TODO fix option text wrap
//TODO fix option ui
//TODO backend validation for inputs
//TODO animations
//TODO start new todo from voting page
//TODO auto delete poll
//TODO add poll end date on voting page
//TODO fix github page
