import { Separator } from '@/components/ui/separator'

interface PageHeadingProps {
	children: React.ReactNode
}

function PageHeading({ children }: PageHeadingProps) {
	return (
		<div className="flex-initial">
			<h2 className="text-2xl font-medium">{children}</h2>
			<Separator className="mt-7" />
		</div>
	)
}

export default PageHeading
