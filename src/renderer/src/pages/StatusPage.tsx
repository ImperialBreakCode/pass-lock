import StatusCard from '@/components/status/StatusCard'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'

function StatusPage() {
	return (
		<PageWrapper>
			<PageHeader pageTitle="Status" />

			<div className="mt-4">
				<StatusCard />
			</div>
		</PageWrapper>
	)
}

export default StatusPage
