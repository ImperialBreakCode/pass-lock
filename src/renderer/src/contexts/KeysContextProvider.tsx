import EncyptionKeys from '@/models/encryptionKeys.type'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

interface KeysContextProps {
	children: ReactNode
}

export const KeysContext = createContext<
	[EncyptionKeys | null, Dispatch<SetStateAction<EncyptionKeys | null>>]
>([null, () => {}])

export const MasterPasswordExistsContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}])

function KeysContextProvider({ children }: KeysContextProps) {
	const [keys, setKeys] = useState<EncyptionKeys | null>(null)
	const [masterPasswordExists, setMasterPasswordExists] = useState(false)

	useEffect(() => {
		async function init() {
			const result = await window.api.checkIfAnyAccountsExist()

			if (typeof result === 'boolean') {
				setMasterPasswordExists(result)
			}
		}

		init()
	}, [])

	return (
		<KeysContext.Provider value={[keys, setKeys]}>
			<MasterPasswordExistsContext.Provider
				value={[masterPasswordExists, setMasterPasswordExists]}
			>
				{children}
			</MasterPasswordExistsContext.Provider>
		</KeysContext.Provider>
	)
}

export default KeysContextProvider
