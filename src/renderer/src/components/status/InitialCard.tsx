import { Info } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '@radix-ui/react-separator'
import { Button } from '../ui/button'

function InitialCard() {
	return (
		<Card className="border-border">
			<CardHeader>
				<CardTitle className="mb-2 flex">
					<Info className="mr-2" /> Secure storage
				</CardTitle>
				<Separator />
				<CardDescription>
					Secure storage keeps all your account information safe using encryption. It is
					stored in data.json file which can be found at{' '}
					<b>{window.api.getPaths().passwordStorage}</b>. Password lock uses master
					password to encrypt your data. You can setup your master password in settings.
					<br />
					<br />
					<b>
						Write down your master password and store it somewhere safe. If you lose it,
						you will not be able to recover your data.
					</b>
					<div className="mt-5 flex">
						<Button
							variant={'secondary'}
							className="ms-auto"
							onClick={() => window.api.openStorageFolder()}
						>
							Open storage folder
						</Button>
					</div>
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default InitialCard
