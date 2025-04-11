import InitialCard from '@/components/status/InitialCard'
import MasterPasswordSetupInfoCard from '@/components/status/MasterPasswordSetupInfoCard'
import StatusCard from '@/components/status/StatusCard'
import UnlockManagerForm from '@/components/status/UnlockManagerForm'
import UpdateAvailableDialog from '@/components/status/UpdateAvailableDialog'
import UpdateDownloadStatus from '@/components/status/UpdateDownloadStatus'
import { KeysContext, MasterPasswordExistsContext } from '@/contexts/KeysContextProvider'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import SideSheet from '@/elements/SideSheet'
import { useContext, useState } from 'react'

function StatusPage() {
	const [keys, setKeys] = useContext(KeysContext)
	const [masterPasswordExists] = useContext(MasterPasswordExistsContext)

	const [unlockSheetOpen, setUnlockSheetOpen] = useState(false)

	return (
		<PageWrapper>
			<UpdateDownloadStatus />

			<UpdateAvailableDialog
				onInstall={() => {
					window.api.installUpdate()
				}}
			/>

			<SideSheet
				open={unlockSheetOpen}
				onOpenChange={setUnlockSheetOpen}
				title="Unlock Storage"
				description={`Unlock the password storage with your master password.`}
			>
				<UnlockManagerForm onSuccessfullSubmit={() => setUnlockSheetOpen(false)} />
			</SideSheet>

			<PageHeader pageTitle="Status" />
			<div className="mt-4">
				<div className="mb-2">
					{masterPasswordExists ? (
						<StatusCard
							lockStorage={() => setKeys(null)}
							unlocked={keys !== null}
							openUnlockSheet={() => setUnlockSheetOpen(true)}
						/>
					) : (
						<MasterPasswordSetupInfoCard />
					)}
				</div>

				<div>
					<InitialCard />
				</div>
			</div>
		</PageWrapper>
	)
}

export default StatusPage
