import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import { ReactNode } from 'react'
import { Link, To } from 'react-router-dom'

interface PageHeaderProps {
	pageTitle: string
	backButtonLink?: To
	rightElement?: ReactNode
}

function PageHeader({ pageTitle, backButtonLink, rightElement }: PageHeaderProps) {
	return (
		<div className="flex-initial">
			<div className="flex items-center">
				{backButtonLink && (
					<Link to={backButtonLink} className="mr-4">
						<Button variant="ghost">
							<ArrowLeft />
						</Button>
					</Link>
				)}

				<h2 className="text-lg font-medium">{pageTitle}</h2>

				{rightElement && <div className="ml-auto">{rightElement}</div>}
			</div>

			<Separator className="mt-5" />
		</div>
	)
}

export default PageHeader
