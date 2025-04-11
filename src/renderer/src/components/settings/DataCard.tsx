import { useContext } from 'react'
import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { KeysContext } from '@/contexts/KeysContextProvider'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'

function DataCard() {
	const [keys] = useContext(KeysContext)
	const [, setError] = useContext(ErrorDialogueContext)

	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2">Data Management</CardTitle>
				<Separator />
				<CardDescription className="mt-2">
					Export a decrypted data file, or import and encrypt one. Imported data will be
					added to the existing one.
					<div className="mt-5 flex">
						<Button
							onClick={async () => {
								const result = await window.api.exportData(keys)

								if (result && setError) {
									setError(result)
								}
							}}
							variant={'secondary'}
							className="ms-auto me-3"
						>
							Export data
						</Button>
						<Button
							onClick={async () => {
								const result = await window.api.importData(keys)

								if (result && setError) {
									setError(result)
								}
							}}
							variant={'secondary'}
						>
							Import data
						</Button>
					</div>
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default DataCard
