import { useState } from 'react'
import { Calendar } from './components/ui/calendar'
import { ThemeProvider } from './components/ThemeProvider'

function App(): JSX.Element {
	const [versions] = useState(window.electron.process.versions)

	return (
		<ThemeProvider>
			<div className="bg-background text-foreground">
				<Calendar mode="default" className="rounded-md border" />
				<ul className="versions">
					<li>Electron v{versions.electron}</li>
					<li>Chromium v{versions.chrome}</li>
					<li>Node v{versions.node}</li>
				</ul>
			</div>
		</ThemeProvider>
	)
}

export default App
