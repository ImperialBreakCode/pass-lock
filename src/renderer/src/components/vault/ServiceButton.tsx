import { Link, To } from 'react-router-dom'
import { Button } from '../ui/button'
import { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface ServiceButtonProps {
	children: ReactNode
	link: To
}

function ServiceButton({ children, link }: ServiceButtonProps) {
	return (
		<Link className="mt-4 block" to={link}>
			<Button variant={'outline'} className="w-full justify-between p-6">
				{children} <ChevronRight />
			</Button>
		</Link>
	)
}

export default ServiceButton
