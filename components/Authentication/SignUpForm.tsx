import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import ButtonLoading from "../General/ButtonLoading/ButtonLoading"
import Notification from "../General/Notification/Notification"
import classes from "./SignUpForm.module.css"

interface SignUpFormProps {
	sendData: ({}: { email: string; password: string; name: string }) => void
	loading: boolean
}

export default function SignUpForm({ sendData, loading }: SignUpFormProps) {
	const [signUpForm, setSignUpForm] = useState({
		name: "",
		email: "",
		password: "",
	})
	const [repeatPassword, setRepeatPassword] = useState("")
	const [error, setError] = useState("")

	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		setError("")
		setSignUpForm((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			}
		})
	}

	function errorHandling() {
		if (signUpForm.name.length < 3) {
			setError("Name should be 3 characters or more.")
			return true
		}
		if (signUpForm.password.length < 8) {
			setError("Password should be 8 characters or more.")
			return true
		}
		if (signUpForm.password !== repeatPassword) {
			setError("Passwords do not match.")
			return true
		}
	}

	function formSubmit(e: FormEvent) {
		setError("")
		e.preventDefault()
		if (errorHandling()) return
		sendData(signUpForm)
		setSignUpForm({
			name: "",
			email: "",
			password: "",
		})
		setRepeatPassword("")
	}

	return (
		<form onSubmit={formSubmit}>
			<div className={classes.container}>
				<label htmlFor="email" className={classes.textLabel}>
					Full Name
				</label>
				<input
					className={classes.textInput}
					required
					name="name"
					id="name"
					type={"text"}
					value={signUpForm.name}
					onChange={handleOnChange}
				/>
			</div>
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
					value={signUpForm.email}
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
					value={signUpForm.password}
					onChange={handleOnChange}
				/>
			</div>
			<div className={classes.container}>
				<label htmlFor="re-password" className={classes.textLabel}>
					Re-enter Password
				</label>
				{error && (
					<Notification
						message={error}
						success={false}
						dismiss={() => setError("")}
					/>
				)}
				<input
					className={classes.textInput}
					required
					name="re-password"
					id="re-password"
					type={"password"}
					value={repeatPassword}
					onChange={(e) => {
						setError("")
						setRepeatPassword(e.target.value)
					}}
				/>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<button
					style={{
						display: "flex",
						justifyContent: "center",
					}}
					type="submit"
					className="btn"
				>
					{loading ? <ButtonLoading /> : "Sign Up"}
				</button>
				<p>
					Already have an account?{" "}
					<Link href={"/auth/signin"}>
						<a style={{ textDecoration: "underline", fontWeight: 600 }}>
							Sign in
						</a>
					</Link>{" "}
					instead.
				</p>
			</div>
		</form>
	)
}
