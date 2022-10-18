import "../styles/globals.css"
import type { AppProps } from "next/app"
// import { usePageLoading } from "../hooks/usePageLoading"
import LoadingSpinner from "../components/General/LoadingSpinner/LoadingSpinner"

function MyApp({ Component, pageProps }: AppProps) {
	// const { isPageLoading } = usePageLoading()

	// return isPageLoading ? <LoadingSpinner /> : <Component {...pageProps} />
	return <Component {...pageProps} />
}

export default MyApp
