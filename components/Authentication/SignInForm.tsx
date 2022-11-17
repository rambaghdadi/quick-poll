import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import ButtonLoading from "../General/ButtonLoading/ButtonLoading"
import classes from "./SignInForm.module.css"

interface SignInFormProps {
	sendData: ({}: { email: string; password: string }) => void
	loading: boolean
}

export default function SignInForm({ sendData, loading }: SignInFormProps) {
	const [signInForm, setSignInForm] = useState({
		email: "",
		password: "",
	})

	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		setSignInForm((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			}
		})
	}

	function formSubmit(e: FormEvent) {
		e.preventDefault()
		sendData(signInForm)
	}

	return (
		<form onSubmit={formSubmit}>
			<div className={classes.container}>
				<label htmlFor="email" className={classes.textLabel}>
					Email
				</label>
				<input
					className={classes.textInput}
					required
					name="email"
					id="email"
					type={"email"}
					value={signInForm.email}
					onChange={handleOnChange}
				/>
			</div>
			<div className={classes.container}>
				<label htmlFor="password" className={classes.textLabel}>
					Password
				</label>
				<input
					className={classes.textInput}
					required
					name="password"
					id="password"
					type={"password"}
					value={signInForm.password}
					onChange={handleOnChange}
				/>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<button
					type="submit"
					className="btn"
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					{loading ? <ButtonLoading /> : "Sign In"}
				</button>
				<p>
					Don't have an account?{" "}
					<Link href={"/auth/signup"}>
						<a style={{ textDecoration: "underline", fontWeight: 600 }}>
							Sign up
						</a>
					</Link>{" "}
					instead.
				</p>
			</div>
		</form>
	)
}
