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

interface DeleteAccountConfirmationDialogProps {
	children: ReactNode
	open: boolean
	onClose: () => void
	onDelete: () => void
}

function DeleteAccountConfirmationDialog({
	children,
	open,
	onClose,
	onDelete
}: DeleteAccountConfirmationDialogProps) {
	return (
		<AlertDialog open={open}>
			<AlertDialogContent className="text-foreground border-border bg-card">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Account Info</AlertDialogTitle>
					<AlertDialogDescription>{children}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button onClick={onDelete}>Delete</Button>
					<Button variant={'outline'} onClick={onClose}>
						Cancel
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteAccountConfirmationDialog
