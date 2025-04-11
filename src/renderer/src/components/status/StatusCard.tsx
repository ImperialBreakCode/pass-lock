import { ShieldCheck, ShieldOff } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

interface StatusCardProps {
	unlocked: boolean
	openUnlockSheet: () => void
	lockStorage: () => void
}

function StatusCard({ unlocked, openUnlockSheet, lockStorage }: StatusCardProps) {
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
							Encryption is turned off. Storage is unlocked.
							<div className="mt-5 flex">
								<Button
									variant={'secondary'}
									className="ms-auto"
									onClick={() => lockStorage()}
								>
									Lock storage
								</Button>
							</div>
						</>
					) : (
						<>
							Encryption is turned on and storage is locked.
							<div className="mt-5 flex">
								<Button className="ms-auto" onClick={() => openUnlockSheet()}>
									Unlock
								</Button>
							</div>
						</>
					)}
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default StatusCard
