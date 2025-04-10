import DataCard from '@/components/settings/DataCard'
import PasswordCard from '@/components/settings/PasswordCard'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'

function Settings() {
	return (
		<PageWrapper>
			<PageHeader pageTitle="Settings" />
			<div className="mt-4">
				<div className="mb-2">
					<PasswordCard />
				</div>

				<div>
					<DataCard />
				</div>
			</div>
		</PageWrapper>
	)
}

export default Settings
