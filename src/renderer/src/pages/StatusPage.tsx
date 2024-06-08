import StatusCard from '@/components/status/StatusCard'
import { Separator } from '@/components/ui/separator'
import PageHeading from '@/elements/PageHeading'
import PageWrapper from '@/elements/PageWrapper'

function StatusPage() {
	return (
		<PageWrapper>
			<PageHeading>Status</PageHeading>
			<Separator className="mt-7" />

			<div className="mt-4">
				<StatusCard />
			</div>
		</PageWrapper>
	)
}

export default StatusPage
