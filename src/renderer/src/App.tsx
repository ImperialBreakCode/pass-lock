import { useState } from 'react'
import { Calendar } from './components/ui/calendar'

function App(): JSX.Element {
	const [versions] = useState(window.electron.process.versions)

	return (
		<div className="dark">
			<Calendar />
			<ul className="versions">
				<li>Electron v{versions.electron}</li>
				<li>Chromium v{versions.chrome}</li>
				<li>Node v{versions.node}</li>
			</ul>
		</div>
	)
}

export default App
