import CardInfo from '@/components/about/CardInfo'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'
import { useState } from 'react'

function About() {
	const [versions] = useState(window.electron.process.versions)

	return (
		<PageWrapper>
			<PageHeader pageTitle="About" />

			<div className="grid grid-cols-3 mt-5 space-x-2">
				<CardInfo title="Password lock version" value={window.api.getAppVersion()} />
				<CardInfo title="Electron version" value={versions.electron!} />
				<CardInfo title="Node version" value={versions.node!} />
			</div>

			<div className="grid grid-cols-2 mt-2 space-x-2">
				<CardInfo title="Chromium version" value={versions.chrome!} />
			</div>
		</PageWrapper>
	)
}

export default About
