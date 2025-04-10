import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

function PasswordCard() {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2">Password Management</CardTitle>
				<Separator />
				<CardDescription className="mt-2">
					<Button variant={'secondary'}>Set Master Password</Button>
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default PasswordCard
