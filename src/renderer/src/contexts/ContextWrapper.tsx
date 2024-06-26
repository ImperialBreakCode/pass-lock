import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

interface ContextWrapperProps {
	children: ReactNode
}

export const ErrorDialogueContext = createContext<
	[string | null, Dispatch<SetStateAction<string | null>> | null]
>([null, null])

function ContextWrapper({ children }: ContextWrapperProps) {
	const [error, setError] = useState<null | string>(null)

	return (
		<ErrorDialogueContext.Provider value={[error, setError]}>
			{children}
		</ErrorDialogueContext.Provider>
	)
}

export default ContextWrapper
