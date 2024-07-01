import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'

interface HeaderRightProps {
	addAccountClick: () => void
	updateServiceClick: () => void
	deleteServiceClick: () => void
}

function HeaderRight({
	addAccountClick,
	updateServiceClick,
	deleteServiceClick
}: HeaderRightProps) {
	return (
		<div className="flex">
			<Button onClick={addAccountClick} className="text-xs mr-2" variant={'secondary'}>
				<Plus size={15} className="mr-2" /> Add account info
			</Button>
			<Button onClick={updateServiceClick} className="text-xs mr-2" variant={'secondary'}>
				<Pencil size={15} className="mr-2" /> Edit service
			</Button>
			<Button onClick={deleteServiceClick} className="text-xs" variant={'destructive'}>
				<Trash2 size={15} className="mr-2" /> Delete service
			</Button>
		</div>
	)
}

export default HeaderRight
