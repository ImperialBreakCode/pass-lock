import EncyptionKeys from '@/models/encryptionKeys.type'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface KeysContextProps {
	children: ReactNode
}

export const KeysContext = createContext<
	[EncyptionKeys | null, Dispatch<SetStateAction<EncyptionKeys | null>>]
>([null, () => {}])

function KeysContextProvider({ children }: KeysContextProps) {
	const [keys, setKeys] = useState<EncyptionKeys | null>(null)

	return <KeysContext.Provider value={[keys, setKeys]}>{children}</KeysContext.Provider>
}

export default KeysContextProvider
