import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react'

interface ContextWrapperProps {
	children: ReactNode
}

export const ErrorDialogueContext = createContext<
	[string | null, Dispatch<SetStateAction<string | null>> | null]
>([null, null])

export const UpdateAvailableContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>> | null]
>([false, null])

function ContextWrapper({ children }: ContextWrapperProps) {
	const [error, setError] = useState<null | string>(null)
	const [updateAvailable, setUpdateAvailable] = useState(false)

	useEffect(() => {
		window.api.onUpdateAvailable(() => setUpdateAvailable(true))
	}, [])

	return (
		<UpdateAvailableContext.Provider value={[updateAvailable, setUpdateAvailable]}>
			<ErrorDialogueContext.Provider value={[error, setError]}>
				{children}
			</ErrorDialogueContext.Provider>
		</UpdateAvailableContext.Provider>
	)
}

export default ContextWrapper
