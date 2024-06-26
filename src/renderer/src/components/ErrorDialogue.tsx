import { useContext } from 'react'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from './ui/alert-dialog'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'

function ErrorDialogue() {
	const [message, setMessage] = useContext(ErrorDialogueContext)

	return (
		<AlertDialog open={message !== null}>
			<AlertDialogContent className="text-foreground border-border bg-card">
				<AlertDialogHeader>
					<AlertDialogTitle>Error</AlertDialogTitle>
					<AlertDialogDescription>{message}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => (setMessage ? setMessage(null) : null)}>
						Close
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ErrorDialogue
