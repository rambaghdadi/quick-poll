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
		if (localStorage.getItem("user")) {
			const [id, email, name] = localStorage.getItem("user")!.split("-!-")
			setUser({
				id,
				email,
				name,
			})
			setLoading(false)
		} else {
			setUser(null)
			setLoading(false)
		}
	}, [router])

	function signIn(id: string, email: string, name: string): void {
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
			const response = await fetch(
				`${
					process.env.NODE_ENV === "development"
						? "http://localhost:4000"
						: "https://quickpolls-backend.onrender.com"
				}/api/signout`,
				{
					credentials: "include",
				}
			)
			if (!response.ok) throw new Error(`Please try again later.`)
			router.push("/")
			setUser(null)

			localStorage.removeItem("user")
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
