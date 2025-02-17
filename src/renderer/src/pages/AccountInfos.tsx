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
import AddUpdateAccountForm from '@/components/accountInfo/AddEditAccountForm'
import AddUpdateServiceForm from '@/components/AddUpdateServiceForm'
import DeleteServiceForm from '@/components/accountInfo/DeleteServiceForm'
import AccountInformationDialogue from '@/components/accountInfo/AccountInformationDialog'
import AccountInfo from '@/models/accountInfo.type'
import DeleteAccountConfirmationDialog from '@/components/accountInfo/DeleteAccountConfirmationDialog'
import AlertDestructive from '@/components/AlertDestructive'
import { ScrollArea } from '@/components/ui/scroll-area'

function AccountInfos() {
	const navigate = useNavigate()

	const [searchParams] = useSearchParams()

	const [service, setService] = useState<ServiceInfo | undefined>()
	const [canEdit, setCanEdit] = useState(false)

	const [addAccOpen, setAddAccOpen] = useState(false)
	const [updateServiceOpen, setUpdateServiceOpen] = useState(false)
	const [deleteServiceOpen, setDeleteServiceOpen] = useState(false)

	const [selectedAccount, setSelectedAccount] = useState<AccountInfo | undefined>()
	const [accountToUpdate, setAccountToUpdate] = useState<AccountInfo | undefined>()
	const [accountIdToDelete, setAccountIdToDelete] = useState<string | undefined>()

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

	const onAccountDelete = async () => {
		if (accountIdToDelete && service) {
			const result = await window.api.deleteAccountInfo(accountIdToDelete!, service!.id)

			if (typeof result === 'string' && setErrorMessage) {
				setErrorMessage(result)
			} else {
				await fetchData()
			}
		}

		setAccountIdToDelete(undefined)
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
					This information will be encrypted when the file containing the keys is removed from the encryptionKeys folder.`}
			>
				<AddUpdateAccountForm
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
				description={`Change account collection's name.`}
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
				description={`Do you want to delete this service and all its account information? If yes, enter the service name: ${service?.name}`}
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

			<SideSheet
				open={accountToUpdate !== undefined}
				onOpenChange={(open) => {
					if (!open) {
						setAccountToUpdate(undefined)
					}
				}}
				title="Edit account information"
				description={``}
			>
				{accountToUpdate && service && (
					<AddUpdateAccountForm
						serviceId={service.id}
						accountToUpdate={accountToUpdate}
						onSuccessfullSubmit={async () => {
							setAccountToUpdate(undefined)
							await fetchData()
						}}
					/>
				)}
			</SideSheet>

			<AccountInformationDialogue
				onDelete={() => {
					setAccountIdToDelete(selectedAccount?.id)
					setSelectedAccount(undefined)
				}}
				onEdit={() => {
					setAccountToUpdate(selectedAccount)
					setSelectedAccount(undefined)
				}}
				canEdit={canEdit}
				open={selectedAccount !== undefined}
				onClose={() => setSelectedAccount(undefined)}
			>
				{canEdit ? (
					<>
						<div className="mt-4">
							<p>
								username: <br />
								<span className="text-foreground">{selectedAccount?.username}</span>
							</p>
							<p className="mt-4">
								password <br />
								<span className="text-foreground">{selectedAccount?.password}</span>
							</p>

							{(selectedAccount?.moreInfo.length ?? 0) > 0 && (
								<p className="mt-4">
									More about the account: <br />
									<span className="text-foreground">
										{selectedAccount?.moreInfo}
									</span>
								</p>
							)}
						</div>
					</>
				) : (
					'information is locked'
				)}
			</AccountInformationDialogue>

			<DeleteAccountConfirmationDialog
				open={accountIdToDelete !== undefined}
				onClose={() => setAccountIdToDelete(undefined)}
				onDelete={onAccountDelete}
			>
				<AlertDestructive>
					This action cannot be undone. Are you sure you want to delete this account
					information?
				</AlertDestructive>
			</DeleteAccountConfirmationDialog>

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

			<ScrollArea>
				<AccountTable data={service?.accounts ?? []} onClickRow={onRowSelected} />
			</ScrollArea>
		</PageWrapper>
	)
}

export default AccountInfos
