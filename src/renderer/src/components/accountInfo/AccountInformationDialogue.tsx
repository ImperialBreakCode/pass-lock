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
	canEdit: boolean
	onEdit: () => void
	onDelete: () => void
}

function AccountInformationDialogue({
	open,
	onClose,
	children,
	canEdit,
	onDelete,
	onEdit
}: AccountInformationDialogueProps) {
	return (
		<AlertDialog open={open}>
			<AlertDialogContent className="text-foreground border-border bg-card">
				<AlertDialogHeader>
					<AlertDialogTitle>Account Information</AlertDialogTitle>
					<AlertDialogDescription>{children}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="!mt-5">
					{canEdit && (
						<>
							<Button onClick={onEdit} variant={'outline'}>
								Edit
							</Button>
							<Button onClick={onDelete} variant={'destructive'}>
								Delete
							</Button>
						</>
					)}

					<Button className="!ml-auto" variant={'outline'} onClick={onClose}>
						Close
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default AccountInformationDialogue
