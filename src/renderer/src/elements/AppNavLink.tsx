import { Button } from '@/components/ui/button'
import { NavLink, To } from 'react-router-dom'

interface AppNavLinkProps {
	children: React.ReactNode
	to: To
}

function AppNavLink({ children, to }: AppNavLinkProps) {
	return (
		<NavLink to={to} className={'my-1'}>
			{({ isActive }) => (
				<Button
					variant={isActive ? 'default' : 'ghost'}
					className={`w-full text-left justify-start ${isActive ? '' : 'text-muted-foreground'}`}
				>
					{children}
				</Button>
			)}
		</NavLink>
	)
}

export default AppNavLink
