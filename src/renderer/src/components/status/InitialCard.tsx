import { Info } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '@radix-ui/react-separator'

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
					<b>{window.api.getPaths().passwordStorage}</b>. Password lock generates keys
					which unlock the storage automaticaly. You can find them in another data.json
					file in <b>{window.api.getPaths().keysStorage}</b>. To stop the automatic
					unlocking, remove the data.json file from its folder.
					<br />
					<br />
					<b>
						Store the keys file somewhere safe. If you lose them you will not be able to
						recover your data.
					</b>
				</CardDescription>
			</CardHeader>
		</Card>
	)
}

export default InitialCard
