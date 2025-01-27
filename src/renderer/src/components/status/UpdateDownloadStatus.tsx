import { Alert } from '../ui/alert'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '../ui/alert-dialog'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'
import {
	UpdateProgressContext,
	UpdateStatus,
	UpdateStatusContext
} from '@/contexts/UpdateProgressCtxProvider'
import { useContext } from 'react'

function UpdateDownloadStatus() {
	const [updateStatus, setUpdateStatus] = useContext(UpdateStatusContext)
	const progress = useContext(UpdateProgressContext)

	return (
		<AlertDialog open={updateStatus !== UpdateStatus.NotAvailable}>
			<AlertDialogContent className="border-border text-foreground bg-card">
				<AlertDialogHeader>
					<AlertDialogDescription>
						<AlertDialogTitle className="mb-5 text-primary-foreground">
							{updateStatus === UpdateStatus.Downloading
								? 'Downloading update'
								: 'Update is downloaded'}
						</AlertDialogTitle>
						<Alert className="border-border">
							{updateStatus === UpdateStatus.Downloaded ? (
								<Check className="me-2" />
							) : (
								''
							)}
							<AlertDialogDescription>
								{updateStatus === UpdateStatus.Downloading ? (
									<>
										Downloading update, please wait...
										<Progress className="mt-4" value={progress} />
									</>
								) : (
									'The update has been downloaded. It will be installed when you restart the application.'
								)}
							</AlertDialogDescription>
						</Alert>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{updateStatus === UpdateStatus.Downloaded ? (
						<Button
							onClick={() =>
								setUpdateStatus ? setUpdateStatus(UpdateStatus.NotAvailable) : null
							}
						>
							Ok
						</Button>
					) : (
						''
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default UpdateDownloadStatus
