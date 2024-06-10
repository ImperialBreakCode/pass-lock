import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'

function HeaderRight() {
	return (
		<div className="flex">
			<Button className="text-xs mr-2" variant={'secondary'}>
				<Pencil size={15} className="mr-2" /> Edit service
			</Button>
			<Button className="text-xs" variant={'destructive'}>
				<Trash2 size={15} className="mr-2" /> Delete service
			</Button>
		</div>
	)
}

export default HeaderRight
