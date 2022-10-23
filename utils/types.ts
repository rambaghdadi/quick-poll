export interface PollQuestion {
	id: string
	createdAt: string
	endsAt: string
	question: string
	allowNewOptions: boolean
	optionLimit: number
	totalVotes: number
	options: PollOption[]
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
