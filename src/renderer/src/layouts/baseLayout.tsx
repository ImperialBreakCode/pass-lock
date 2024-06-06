import NavMenu from '@/components/NavMenu'
import { Outlet } from 'react-router-dom'

function BaseLayout() {
	return (
		<div className="h-[100vh] bg-background text-foreground flex">
			<div className="h-full max-w-[30%]">
				<NavMenu />
			</div>
			<div className="h-full">
				<Outlet />
			</div>
		</div>
	)
}

export default BaseLayout
