import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Header from "../components/General/Header/Header"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width"
					initial-scale="1.0"
				/>
				<meta name="description" content="Quick Polls" />
				<meta name="keywords" content="Quick, Fast, Poll, Voting, Choice" />
				<meta property="og:title" content="Quick Polls" />
				<link rel="icon" href="/favicon.ico" />

				<title>Quick Polls</title>
			</Head>
			{router.asPath !== "/" && <Header />}
			<div className="page-container">
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
