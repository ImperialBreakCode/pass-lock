import DataCard from '@/components/settings/DataCard'
import PasswordCard from '@/components/settings/PasswordCard'
import SetMasterPasswordDialog from '@/components/settings/SetMasterPasswordDialog'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import SideSheet from '@/elements/SideSheet'
import { useState } from 'react'

function Settings() {
	const [masterPasswordOpen, setMasterPasswordOpen] = useState(false)

	return (
		<PageWrapper>
			<SideSheet
				open={masterPasswordOpen}
				onOpenChange={setMasterPasswordOpen}
				title="Set Master Password"
				description={`Once you've set your master password, you'll need to add your first account information for the password to be saved and used.`}
			>
				<SetMasterPasswordDialog onSuccessfullSubmit={() => setMasterPasswordOpen(false)} />
			</SideSheet>

			<PageHeader pageTitle="Settings" />
			<div className="mt-4">
				<div className="mb-2">
					<PasswordCard openMasterPasswordDialogue={() => setMasterPasswordOpen(true)} />
				</div>

				<div>
					<DataCard />
				</div>
			</div>
		</PageWrapper>
	)
}

export default Settings
