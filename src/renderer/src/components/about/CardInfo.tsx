import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

interface CardInfoProps {
	title: string
	value: string
}

function CardInfo({ title, value }: CardInfoProps) {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="text-lg font-[300]">{title}</CardTitle>
				<CardDescription className="text-[2.5rem] font-[300] text-foreground">
					{value}
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default CardInfo
