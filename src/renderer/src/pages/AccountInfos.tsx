import HeaderRight from '@/components/accountInfo/HeaderRight'
import AccountTable from '@/components/accountInfo/AccountTable'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import ServiceInfo from '@/models/serviceInfo.type'
import { routes } from '@/routes'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SideSheet from '@/elements/SideSheet'
import AddAccountForm from '@/components/accountInfo/AddAccountForm'

function AccountInfos() {
	const [searchParams] = useSearchParams()
	const [service, setService] = useState<ServiceInfo | undefined>()

	const [addAccOpen, setAddAccOpen] = useState(false)

	const [, setErrorMessage] = useContext(ErrorDialogueContext)

	const fetchData = async () => {
		const serviceId = searchParams.get('serviceId')
		const result = await window.api.getService(serviceId!)

		if (typeof result === 'string' && setErrorMessage) {
			setErrorMessage(result)
		} else {
			setService(result as ServiceInfo)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<PageWrapper>
			<SideSheet
				open={addAccOpen}
				onOpenChange={(open) => setAddAccOpen(open)}
				title="Add an account"
				description={`Add the information about your account. 
					This info will be encrypted when the file containing the keys 
					is removed from the encryptionKeys folder`}
			>
				<AddAccountForm
					serviceId={service?.id ?? ''}
					onSuccessfullSubmit={async () => {
						setAddAccOpen(false)
						await fetchData()
					}}
				/>
			</SideSheet>

			<PageHeader
				pageTitle={service?.name + ' accounts'}
				backButtonLink={routes.vault}
				rightElement={<HeaderRight addAccountClick={() => setAddAccOpen(true)} />}
			/>

			<AccountTable data={service?.accounts ?? []} />
		</PageWrapper>
	)
}

export default AccountInfos
