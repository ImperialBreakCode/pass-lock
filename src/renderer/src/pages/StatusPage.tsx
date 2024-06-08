import StatusCard from '@/components/status/StatusCard'
import PageHeading from '@/elements/PageHeading'
import PageWrapper from '@/elements/PageWrapper'

function StatusPage() {
	return (
		<PageWrapper>
			<PageHeading>Status</PageHeading>

			<div className="mt-4">
				<StatusCard />
			</div>
		</PageWrapper>
	)
}

export default StatusPage
