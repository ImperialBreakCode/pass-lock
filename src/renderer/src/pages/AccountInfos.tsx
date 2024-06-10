import HeaderRight from '@/components/accountInfo/HeaderRight'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import { routes } from '@/routes'

function AccountInfos() {
	return (
		<PageWrapper>
			<PageHeader
				pageTitle="Instagram Accounts"
				backButtonLink={routes.vault}
				rightElement={<HeaderRight />}
			/>
		</PageWrapper>
	)
}

export default AccountInfos
