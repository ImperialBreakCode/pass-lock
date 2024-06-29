import { ShieldCheck, ShieldOff } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

interface StatusCardProps {
	unlocked: boolean
}

function StatusCard({ unlocked }: StatusCardProps) {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2 flex">
					{unlocked ? (
						<>
							<ShieldOff className="mr-2" /> Secure storage unlocked
						</>
					) : (
						<>
							<ShieldCheck className="mr-2" /> Secure storage locked
						</>
					)}
				</CardTitle>
				<Separator />
				<CardDescription>
					{unlocked ? (
						<>
							To turn on storage encryption, remove the json file containing the
							locker keys from <i>location</i> and store it somewhere safe.
						</>
					) : (
						<>Encryption is turned on and storage is locked.</>
					)}
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default StatusCard
