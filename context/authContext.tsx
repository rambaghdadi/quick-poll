import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthProviderValues, User } from "../utils/types"

const values: AuthProviderValues = {
	user: null,
	signIn: () => {},
	signUp: () => {},
	signOut: () => {},
}

export const AuthContext = createContext(values)

export function useAuth() {
	return useContext(AuthContext)
}

interface AuthProviderProps {
	children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (localStorage.getItem("user") && localStorage.getItem("token")) {
			const [id, email, name] = localStorage.getItem("user")!.split("-!-")
			const token = localStorage.getItem("token")
			setUser({
				id,
				email,
				name,
				token,
			})
			setLoading(false)
		} else {
			setUser(null)
			setLoading(false)
		}
	}, [router])

	function signIn(
		id: string,
		email: string,
		name: string,
		token: string
	): void {
		localStorage.setItem("token", token)
		localStorage.setItem("user", `${id}-!-${email}-!-${name}`)
		if (router.query.from) {
			router.push(router.query.from.toString())
			return
		}
		router.push("/dashboard")
	}

	function signUp(): void {
		router.push("/auth/signin")
	}

	async function signOut() {
		try {
			router.push("/")
			localStorage.removeItem("user")
			localStorage.removeItem("token")
			setUser(null)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
