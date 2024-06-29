import ServiceButton from '@/components/vault/ServiceButton'
import ServiceControl from '@/components/vault/ServiceControl'
import { ScrollArea } from '@/components/ui/scroll-area'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import { routes } from '@/routes'
import SideSheet from '@/components/SideSheet'
import { useState } from 'react'
import AddServiceForm from '@/components/vault/AddServiceForm'

function Vault() {
	const [sideOpen, setSideOpen] = useState(false)

	return (
		<PageWrapper>
			<SideSheet
				open={sideOpen}
				onOpenChange={(open) => setSideOpen(open)}
				description="Add an account service (a collection of account infos) where you can safely store passwords and more information about your accounts"
				title="Add an account service"
			>
				<AddServiceForm />
			</SideSheet>

			<PageHeader pageTitle="Password vault" />

			<ScrollArea className="flex-auto px-5">
				<ServiceControl
					onAddService={() => {
						setSideOpen(true)
					}}
				/>

				<div className="pb-4">
					<ServiceButton link={routes.accountInfos}>Instagram</ServiceButton>
				</div>
			</ScrollArea>
		</PageWrapper>
	)
}

export default Vault
