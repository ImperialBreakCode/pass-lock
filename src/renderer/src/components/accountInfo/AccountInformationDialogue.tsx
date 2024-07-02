import { ReactNode } from 'react'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

interface AccountInformationDialogueProps {
	open: boolean
	onClose: () => void
	children: ReactNode
}

function AccountInformationDialogue({ open, onClose, children }: AccountInformationDialogueProps) {
	return (
		<AlertDialog open={open}>
			<AlertDialogContent className="text-foreground border-border bg-card">
				<AlertDialogHeader>
					<AlertDialogTitle>Account Information</AlertDialogTitle>
					<AlertDialogDescription>{children}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button variant={'default'} onClick={onClose}>
						Close
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default AccountInformationDialogue
