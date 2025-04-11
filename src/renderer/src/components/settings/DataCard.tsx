import { useContext } from 'react'
import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { KeysContext } from '@/contexts/KeysContextProvider'

function DataCard() {
	const [keys] = useContext(KeysContext)

	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2">Data Management</CardTitle>
				<Separator />
				<CardDescription className="mt-2">
					Export a decrypted data file, or import and encrypt one. If you choose to
					import, your current password will be replaced, and the existing data will be
					backed up at the following location:
					<div className="mt-5 flex">
						<Button
							onClick={async () => {
								await window.api.exportData(keys)
							}}
							variant={'secondary'}
							className="ms-auto me-3"
						>
							Export data
						</Button>
						<Button variant={'secondary'}>Import data</Button>
					</div>
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default DataCard
