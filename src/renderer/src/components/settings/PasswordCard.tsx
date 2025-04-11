import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

interface PasswordCardProps {
	openMasterPasswordDialogue: () => void
}

function PasswordCard({ openMasterPasswordDialogue }: PasswordCardProps) {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2">Password Management</CardTitle>
				<Separator />
				<CardDescription className="mt-2">
					<Button onClick={() => openMasterPasswordDialogue()} variant={'secondary'}>
						Set Master Password
					</Button>
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default PasswordCard
