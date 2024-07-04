import ServiceButton from '@/components/vault/ServiceButton'
import ServiceControl from '@/components/vault/ServiceControl'
import { ScrollArea } from '@/components/ui/scroll-area'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import { routes } from '@/routes'
import SideSheet from '@/elements/SideSheet'
import { useContext, useEffect, useState } from 'react'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'
import ServiceInfo from '@/models/serviceInfo.type'
import AddUpdateServiceForm from '@/components/AddUpdateServiceForm'

function Vault() {
	const [, setErrorMessage] = useContext(ErrorDialogueContext)

	const [sideOpen, setSideOpen] = useState(false)
	const [services, setServices] = useState<ServiceInfo[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [canEdit, setCanEdit] = useState(false)

	const filterData = (data: ServiceInfo[]) => {
		return data.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
	}

	const fetchData = async () => {
		const result = await window.api.getAllServices()

		if (typeof result === 'string' && setErrorMessage) {
			setErrorMessage(result)
		} else {
			setServices(result as ServiceInfo[])
		}

		setCanEdit(window.api.checkForKeys())
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<PageWrapper>
			<SideSheet
				open={sideOpen}
				onOpenChange={(open) => setSideOpen(open)}
				description="Add an account service, a collection of account information, where you can safely store passwords and other details about your accounts."
				title="Add an account service"
			>
				<AddUpdateServiceForm
					onSuccessfullSubmit={async () => {
						await fetchData()
						setSideOpen(false)
					}}
				/>
			</SideSheet>

			<PageHeader pageTitle="Password vault" />

			<ScrollArea className="flex-auto px-5">
				<ServiceControl
					canEdit={canEdit}
					onSearch={(e) => {
						setSearchTerm(e.target.value)
					}}
					onAddService={() => {
						setSideOpen(true)
					}}
				/>

				<div className="pb-4">
					{filterData(services).map((service) => (
						<ServiceButton
							key={service.id}
							link={routes.accountInfos + '?serviceId=' + service.id}
						>
							{service.name}
						</ServiceButton>
					))}
				</div>
			</ScrollArea>
		</PageWrapper>
	)
}

export default Vault
