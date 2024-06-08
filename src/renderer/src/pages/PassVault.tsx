import ServiceButton from '@/components/passVault/ServiceButton'
import ServiceControl from '@/components/passVault/ServiceControl'
import { ScrollArea } from '@/components/ui/scroll-area'
import PageHeading from '@/elements/PageHeading'
import PageWrapper from '@/elements/PageWrapper'

function PassVault() {
	return (
		<PageWrapper>
			<PageHeading>Password vault</PageHeading>

			<ScrollArea className="flex-auto px-5">
				<ServiceControl onAddService={() => {}} />

				<div className="pb-4">
					<ServiceButton link={'#'}>Instagram</ServiceButton>
					<ServiceButton link={'#'}>Instagram</ServiceButton>
					<ServiceButton link={'#'}>Instagram</ServiceButton>
					<ServiceButton link={'#'}>Instagram</ServiceButton>
					<ServiceButton link={'#'}>Instagram</ServiceButton>
					<ServiceButton link={'#'}>Instagram</ServiceButton>
					<ServiceButton link={'#'}>Instagram</ServiceButton>
					<ServiceButton link={'#'}>Instagram</ServiceButton>
				</div>
			</ScrollArea>
		</PageWrapper>
	)
}

export default PassVault
