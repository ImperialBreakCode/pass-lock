import CardInfo from '@/components/about/CardInfo'
import PageHeader from '@/elements/PageHeader'
import PageWrapper from '@/elements/PageWrapper'

function About() {
	return (
		<PageWrapper>
			<PageHeader pageTitle="About" />

			<div className="flex mt-5">
				<CardInfo title="Version" value={'window.electron.process.versions.electron'} />
			</div>
		</PageWrapper>
	)
}

export default About
