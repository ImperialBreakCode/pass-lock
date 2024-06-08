import { ShieldOff } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

function StatusCard() {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2 flex">
					<ShieldOff className="mr-2" /> Secure storage unlocked
				</CardTitle>
				<Separator />
				<CardDescription>
					To turn on storage encryption, remove the json file containing the lock keys
					from <i>location</i> and store it somewhere safe.
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default StatusCard
