import DataCard from '@/components/settings/DataCard'
import PasswordCard from '@/components/settings/PasswordCard'
import SetMasterPasswordForm from '@/components/settings/SetMasterPasswordForm'
import { KeysContext, MasterPasswordExistsContext } from '@/contexts/KeysContextProvider'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import SideSheet from '@/elements/SideSheet'
import { useContext, useState } from 'react'

function Settings() {
	const [masterPasswordExists, setMasterPasswordExists] = useContext(MasterPasswordExistsContext)
	const [keys] = useContext(KeysContext)

	const [masterPasswordOpen, setMasterPasswordOpen] = useState(false)

	return (
		<PageWrapper>
			<SideSheet
				open={masterPasswordOpen}
				onOpenChange={setMasterPasswordOpen}
				title="Set Master Password"
				description={`Once you've set your master password, you'll need to add your first account information for the password to be used and saved.`}
			>
				<SetMasterPasswordForm
					onSuccessfullSubmit={() => {
						setMasterPasswordOpen(false)
						setMasterPasswordExists(true)
					}}
				/>
			</SideSheet>

			<PageHeader pageTitle="Settings" />
			<div className="mt-4">
				{!masterPasswordExists && (
					<div className="mb-2">
						<PasswordCard
							openMasterPasswordDialogue={() => setMasterPasswordOpen(true)}
						/>
					</div>
				)}

				{keys && (
					<div>
						<DataCard />
					</div>
				)}
			</div>
		</PageWrapper>
	)
}

export default Settings
