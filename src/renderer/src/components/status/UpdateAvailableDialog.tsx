import { ArrowBigDownDash } from 'lucide-react'
import { Alert } from '../ui/alert'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useContext } from 'react'
import { UpdateAvailableContext } from '@/contexts/ContextWrapper'

interface UpdateAvailableDialogProps {
	onInstall: () => void
}

function UpdateAvailableDialog({ onInstall }: UpdateAvailableDialogProps) {
	const [updateAvailable, setUpdateAvailable] = useContext(UpdateAvailableContext)

	return (
		<AlertDialog open={updateAvailable}>
			<AlertDialogContent className="border-border text-foreground bg-card">
				<AlertDialogHeader>
					<AlertDialogDescription>
						<AlertDialogTitle className="mb-5 text-primary-foreground">
							Update available
						</AlertDialogTitle>
						<Alert className="border-border">
							<ArrowBigDownDash />
							<AlertDialogDescription>
								An update is available. Do you want to download and install it now?
							</AlertDialogDescription>
						</Alert>
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<Button
						className="me-2 mb-2"
						variant={'outline'}
						onClick={() => (setUpdateAvailable ? setUpdateAvailable(false) : null)}
					>
						Cancel
					</Button>
					<Button
						className="mb-2"
						onClick={() => {
							setUpdateAvailable ? setUpdateAvailable(false) : null
							onInstall()
						}}
					>
						Install
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default UpdateAvailableDialog
