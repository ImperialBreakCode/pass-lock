import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { ReactNode } from 'react'

interface AlertDestructiveProps {
	children: ReactNode
}

function AlertDestructive({ children }: AlertDestructiveProps) {
	return (
		<Alert variant="destructive" className="mt-5">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	)
}

export default AlertDestructive
