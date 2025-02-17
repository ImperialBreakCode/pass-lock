import AppNavLink from '@/elements/AppNavLink'
import LeftNavMenuBox from '@/elements/LeftNavMenuBox'
import { routes } from '@/routes'
import { Info, Shield, Vault } from 'lucide-react'
import transparentIcon from '@/assets/transparentIcon.svg'

function NavMenu() {
	return (
		<LeftNavMenuBox>
			<div className="px-2 flex flex-col items-center">
				<img className="w-12" src={transparentIcon} />
				<h1 className="text-lg font-medium capitalize">password lock</h1>
			</div>

			<div className="pt-5 w-48">
				<nav className="flex flex-col">
					<AppNavLink to={routes.status}>
						<Shield className="inline w-5" /> <span className="pl-3">Status</span>
					</AppNavLink>
					<AppNavLink to={routes.vault}>
						<Vault className="inline w-5" />{' '}
						<span className="pl-3">Password vault</span>
					</AppNavLink>
					<AppNavLink to={routes.about}>
						<Info className="inline w-5" /> <span className="pl-3">About</span>
					</AppNavLink>
				</nav>
			</div>
		</LeftNavMenuBox>
	)
}

export default NavMenu
