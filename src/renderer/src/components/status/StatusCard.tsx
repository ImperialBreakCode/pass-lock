import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

function StatusCard() {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	)
}

export default StatusCard
