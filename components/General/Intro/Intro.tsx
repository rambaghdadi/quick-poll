import { useRouter } from "next/router"
import { FC, useEffect, useRef } from "react"
import classes from "./Intro.module.css"

const Intro: FC = () => {
	const router = useRouter()
	const wordInHeadline = useRef<HTMLSpanElement>(null)

	const wordsToLoop = ["fun", "work", "free"]

	const sleep = (m: number) => new Promise((r) => setTimeout(r, m))

	// async function loopThroughLetters(word: string) {
	// 	let bg = "#1e1e1ec0"
	// 	let currentColor = "white"
	// 	let newColor = "#333"
	// 	if (
	// 		window.matchMedia &&
	// 		window.matchMedia("(prefers-color-scheme: dark)").matches
	// 	) {
	// 		bg = "rgba(255, 255, 255, 0.863)"
	// 		currentColor = "#333"
	// 		newColor = "white"
	// 	}
	// 	await sleep(2000)
	// 	wordInHeadline.current!.style.backgroundColor = bg
	// 	wordInHeadline.current!.style.color = currentColor
	// 	await sleep(800)
	// 	//delete word
	// 	wordInHeadline.current!.innerHTML = ""
	// 	wordInHeadline.current!.style.backgroundColor = "transparent"
	// 	wordInHeadline.current!.style.color = newColor
	// 	await sleep(800)

	// 	//add new word
	// 	for (let letter of word) {
	// 		wordInHeadline.current!.innerHTML += letter
	// 		await sleep(200)
	// 	}
	// }

	async function loopThroughLetters(word: string) {
		await sleep(1000)
		//delete letters
		const wordLength = wordInHeadline.current!.innerHTML.length
		let i = 0
		while (i < wordLength) {
			await sleep(100)
			wordInHeadline.current!.innerHTML =
				wordInHeadline.current!.innerHTML.slice(0, -1)
			i++
		}

		// add new word
		await sleep(1000)
		for (let letter of word) {
			wordInHeadline.current!.innerHTML += letter
			await sleep(200)
		}
	}

	async function loopThroughWords(words: string[]) {
		let i = 0
		while (true) {
			if (i > words.length - 1) i = 0
			await loopThroughLetters(words[i])
			i++
		}
	}

	useEffect(() => {
		loopThroughWords(wordsToLoop)
	}, [])

	return (
		<div className={classes.main}>
			<h1>
				Create quick, real-time polls for{" "}
				<span ref={wordInHeadline} className={classes.changingText}>
					free
				</span>
			</h1>
			<button
				className="btn"
				style={{ padding: "2.5rem", fontSize: "2rem" }}
				onClick={() => {
					router.push("/new-poll")
				}}
			>
				Create New Poll
			</button>
			<p>No registration required.</p>
		</div>
	)
}

export default Intro
