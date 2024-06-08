import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'

interface ServiceControlProps {
	onAddService: React.MouseEventHandler<HTMLButtonElement>
}

function ServiceControl({ onAddService }: ServiceControlProps) {
	return (
		<Card className="border-border my-5">
			<CardHeader>
				<CardTitle className="text-lg">Account services</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-between">
				<Input placeholder="search..." />

				<Button className="ml-5" onClick={onAddService}>
					Add service
				</Button>
			</CardContent>
		</Card>
	)
}

export default ServiceControl
