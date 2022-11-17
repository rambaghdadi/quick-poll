import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "../../context/authContext"

export default function ProtectedRoute(props: any) {
	const { user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push("/auth/signin")
		}
	}, [router, user])

	return <>{user && props.children}</>
}
