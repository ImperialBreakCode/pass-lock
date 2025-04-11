import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react'
import UpdateProgressCtxProvider from './UpdateProgressCtxProvider'
import KeysContextProvider from './KeysContextProvider'

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
			<UpdateProgressCtxProvider>
				<KeysContextProvider>
					<ErrorDialogueContext.Provider value={[error, setError]}>
						{children}
					</ErrorDialogueContext.Provider>
				</KeysContextProvider>
			</UpdateProgressCtxProvider>
		</UpdateAvailableContext.Provider>
	)
}

export default ContextWrapper
