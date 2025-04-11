import { ShieldAlert } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '@radix-ui/react-separator'

function MasterPasswordSetupInfoCard() {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2 flex">
					<ShieldAlert className="mr-2" /> Setup your master password
				</CardTitle>
				<Separator />
				<CardDescription className="mt-2">
					You haven&apos;t set up a master password yet. Head to Settings to create one
					and add your first account.
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default MasterPasswordSetupInfoCard
