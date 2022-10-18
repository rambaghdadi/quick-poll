import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
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
				<link rel="icon" href="/favicon.ico" />
				<title>Quick Polls</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
