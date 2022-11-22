import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Header from "../components/General/Header/Header"
import Script from "next/script"
import { AuthProvider } from "../context/authContext"

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
			<AuthProvider>
				<Header />
				<div className="page-container">
					<Component {...pageProps} />
				</div>
			</AuthProvider>
			<Script
				id="g-analytics-script-1"
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-13YT2LWHNY"
				strategy="afterInteractive"
			/>
			<Script
				id="g-analytics-script-2"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				  
					gtag('config', 'G-13YT2LWHNY')`,
				}}
			/>
		</>
	)
}

export default MyApp
