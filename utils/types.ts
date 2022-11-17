export interface PollQuestion {
	id: string
	createdAt: string
	endsAt: string
	question: string
	allowNewOptions: boolean
	optionLimit: number
	totalVotes: number
	options: PollOption[]
	secure: boolean
}

export interface PollOption {
	id: string
	title: string
	vote: number
	createdAt: string
	questionId: string
}

export interface QuestionFormData {
	question: string
	allowNewOptions: boolean
	optionLimit: number
}

export interface User {
	email: string | null
	name: string | null
	id: string | null
}

export interface AuthProviderValues {
	user: User | null
	signIn: (id: string, email: string, name: string) => void
	signOut: () => void
	signUp: () => void
}
