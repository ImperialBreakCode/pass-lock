import InitialCard from '@/components/status/InitialCard'
import StatusCard from '@/components/status/StatusCard'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import { useEffect, useState } from 'react'

function StatusPage() {
	const [isInital, setIsInital] = useState(false)
	const [keysExist, setKeysExist] = useState(false)

	useEffect(() => {
		async function init() {
			setIsInital(await window.api.checkForInitialState())
			setKeysExist(window.api.checkForKeys())
		}

		init()
	}, [])

	return (
		<PageWrapper>
			<PageHeader pageTitle="Status" />
			<div className="mt-4">
				<div className="mb-2">
					<StatusCard unlocked={keysExist} />
				</div>

				<div>{isInital && <InitialCard />}</div>
			</div>
		</PageWrapper>
	)
}

export default StatusPage
