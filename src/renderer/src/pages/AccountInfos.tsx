import HeaderRight from '@/components/accountInfo/HeaderRight'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import ServiceInfo from '@/models/serviceInfo.type'
import { routes } from '@/routes'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function AccountInfos() {
	const [searchParams] = useSearchParams()
	const [service, setService] = useState<ServiceInfo | undefined>()

	const [, setErrorMessage] = useContext(ErrorDialogueContext)

	useEffect(() => {
		async function fetchData() {
			const serviceId = searchParams.get('serviceId')
			const result = await window.api.getService(serviceId!)

			if (typeof result === 'string' && setErrorMessage) {
				setErrorMessage(result)
			} else {
				setService(result as ServiceInfo)
			}
		}

		fetchData()
	}, [])

	return (
		<PageWrapper>
			<PageHeader
				pageTitle={service?.name + ' accounts'}
				backButtonLink={routes.vault}
				rightElement={<HeaderRight />}
			/>
		</PageWrapper>
	)
}

export default AccountInfos
