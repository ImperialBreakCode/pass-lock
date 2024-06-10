import ServiceButton from '@/components/vault/ServiceButton'
import ServiceControl from '@/components/vault/ServiceControl'
import { ScrollArea } from '@/components/ui/scroll-area'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import { routes } from '@/routes'

function Vault() {
	return (
		<PageWrapper>
			<PageHeader pageTitle="Password vault" />

			<ScrollArea className="flex-auto px-5">
				<ServiceControl onAddService={() => {}} />

				<div className="pb-4">
					<ServiceButton link={routes.accountInfos}>Instagram</ServiceButton>
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

export default Vault
