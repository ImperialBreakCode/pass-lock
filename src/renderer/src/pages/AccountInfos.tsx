import HeaderRight from '@/components/accountInfo/HeaderRight'
import AccountTable from '@/components/accountInfo/AccountTable'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import ServiceInfo from '@/models/serviceInfo.type'
import { routes } from '@/routes'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SideSheet from '@/elements/SideSheet'
import AddAccountForm from '@/components/accountInfo/AddAccountForm'
import AddUpdateServiceForm from '@/components/AddUpdateServiceForm'
import DeleteServiceForm from '@/components/accountInfo/DeleteServiceForm'
import AccountInformationDialogue from '@/components/accountInfo/AccountInformationDialogue'
import AccountInfo from '@/models/accountInfo.type'

function AccountInfos() {
	const navigate = useNavigate()

	const [searchParams] = useSearchParams()

	const [service, setService] = useState<ServiceInfo | undefined>()
	const [canEdit, setCanEdit] = useState(false)

	const [addAccOpen, setAddAccOpen] = useState(false)
	const [updateServiceOpen, setUpdateServiceOpen] = useState(false)
	const [deleteServiceOpen, setDeleteServiceOpen] = useState(false)

	const [selectedAccount, setSelectedAccount] = useState<AccountInfo | undefined>()

	const [, setErrorMessage] = useContext(ErrorDialogueContext)

	const fetchData = async () => {
		const serviceId = searchParams.get('serviceId')
		const result = await window.api.getService(serviceId!)

		if (typeof result === 'string' && setErrorMessage) {
			setErrorMessage(result)
		} else {
			setService(result as ServiceInfo)
		}

		setCanEdit(window.api.checkForKeys())
	}

	const onRowSelected = (id: string) => {
		const acc = service?.accounts.find((account) => account.id === id)

		if (acc) {
			setSelectedAccount(acc)
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

			<SideSheet
				open={updateServiceOpen}
				onOpenChange={(open) => setUpdateServiceOpen(open)}
				title="Edit service"
				description={`Change account collection's name`}
			>
				<AddUpdateServiceForm
					serviceToUpdate={service}
					onSuccessfullSubmit={async () => {
						setUpdateServiceOpen(false)
						await fetchData()
					}}
				/>
			</SideSheet>

			<SideSheet
				open={deleteServiceOpen}
				onOpenChange={(open) => setDeleteServiceOpen(open)}
				title="Delete service"
				description={`Do you want to delete this service with all its account information? If yes, enter the service name: ${service?.name}`}
			>
				{service && (
					<DeleteServiceForm
						service={service}
						onSuccessfullSubmit={async () => {
							navigate(routes.vault)
						}}
					/>
				)}
			</SideSheet>

			<AccountInformationDialogue
				open={selectedAccount !== undefined}
				onClose={() => setSelectedAccount(undefined)}
			>
				<div className="flex mt-4">
					<p>
						username:{' '}
						<span className="text-foreground text-[1.1rem]">
							{selectedAccount?.username}
						</span>
					</p>
					<p className="ml-4">
						password{' '}
						<span className="text-foreground text-[1.1rem]">
							{selectedAccount?.password}
						</span>
					</p>
				</div>

				{(selectedAccount?.moreInfo.length ?? 0) > 0 && (
					<p className="mt-4">
						<span className="text-foreground">More information: </span> <br />
						{selectedAccount?.moreInfo}
					</p>
				)}
			</AccountInformationDialogue>

			<PageHeader
				pageTitle={service?.name + ' accounts'}
				backButtonLink={routes.vault}
				rightElement={
					canEdit ? (
						<HeaderRight
							updateServiceClick={() => setUpdateServiceOpen(true)}
							addAccountClick={() => setAddAccOpen(true)}
							deleteServiceClick={() => setDeleteServiceOpen(true)}
						/>
					) : undefined
				}
			/>

			<AccountTable data={service?.accounts ?? []} onClickRow={onRowSelected} />
		</PageWrapper>
	)
}

export default AccountInfos
