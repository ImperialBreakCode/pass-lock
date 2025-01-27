import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react'

export enum UpdateStatus {
	NotAvailable,
	Downloading,
	Downloaded
}

interface UpdateProgressContextProps {
	children: ReactNode
}

export const UpdateStatusContext = createContext<
	[UpdateStatus, Dispatch<SetStateAction<UpdateStatus>> | null]
>([UpdateStatus.NotAvailable, null])

export const UpdateProgressContext = createContext<number>(0)

function UpdateProgressCtxProvider({ children }: UpdateProgressContextProps) {
	const [updateStatus, setUpdateStatus] = useState(UpdateStatus.NotAvailable)
	const [progress, setProgress] = useState(0)

	const onUpdateDownloadingHandler = (progressPercent: number) => {
		if (updateStatus === UpdateStatus.NotAvailable) {
			setUpdateStatus(UpdateStatus.Downloading)
		}

		setProgress(progressPercent)
	}

	const onUpdateDownloadedHandler = () => {
		setUpdateStatus(UpdateStatus.Downloaded)
	}

	const onUpdateErrorHandler = () => {
		setUpdateStatus(UpdateStatus.NotAvailable)
		setProgress(0)
	}

	useEffect(() => {
		window.api.onUpdateDownloading(onUpdateDownloadingHandler)
		window.api.onUpdateDownloaded(onUpdateDownloadedHandler)

		window.api.onUpdateError(onUpdateErrorHandler)
	}, [])

	return (
		<UpdateStatusContext.Provider value={[updateStatus, setUpdateStatus]}>
			<UpdateProgressContext.Provider value={progress}>
				{children}
			</UpdateProgressContext.Provider>
		</UpdateStatusContext.Provider>
	)
}

export default UpdateProgressCtxProvider
