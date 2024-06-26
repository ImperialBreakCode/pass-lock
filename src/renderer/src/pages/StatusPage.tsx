import InitialCard from '@/components/status/InitialCard'
import StatusCard from '@/components/status/StatusCard'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'

function StatusPage() {
	return (
		<PageWrapper>
			<PageHeader pageTitle="Status" />

			<div className="mt-4">
				<div className="mb-2">
					<StatusCard />
				</div>

				<div>
					<InitialCard />
				</div>
			</div>
		</PageWrapper>
	)
}

export default StatusPage
