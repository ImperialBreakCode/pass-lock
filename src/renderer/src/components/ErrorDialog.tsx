import { useContext } from 'react'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from './ui/alert-dialog'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'
import { Button } from './ui/button'

function ErrorDialog() {
	const [message, setMessage] = useContext(ErrorDialogueContext)

	return (
		<AlertDialog open={message !== null}>
			<AlertDialogContent className="text-foreground border-border bg-card">
				<AlertDialogHeader>
					<AlertDialogTitle>Error</AlertDialogTitle>
					<AlertDialogDescription>{message}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button
						variant={'outline'}
						onClick={() => (setMessage ? setMessage(null) : null)}
					>
						Close
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ErrorDialog
