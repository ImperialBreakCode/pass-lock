import { Info } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '@radix-ui/react-separator'

function InitialCard() {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2 flex">
					<Info className="mr-2" /> Secure storage ready
				</CardTitle>
				<Separator />
				<CardDescription>Secure storage is ready to use.</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default InitialCard
