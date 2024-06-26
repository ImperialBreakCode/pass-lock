import StatusCard from '@/components/status/StatusCard'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import { useContext, useEffect } from 'react'

function StatusPage() {
	const [, setError] = useContext(ErrorDialogueContext)

	useEffect(() => {
		if (setError) {
			setError('aaaa')
		}
	}, [setError])

	return (
		<PageWrapper>
			<PageHeader pageTitle="Status" />

			<div className="mt-4">
				<StatusCard />
			</div>
		</PageWrapper>
	)
}

export default StatusPage
