import { ThemeProvider } from './components/ThemeProvider'
import { HashRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/baseLayout'
import StatusPage from './pages/StatusPage'

function App(): JSX.Element {
	return (
		<ThemeProvider>
			<HashRouter>
				<Routes>
					<Route path="/" element={<BaseLayout />}>
						<Route index element={<StatusPage />} />
					</Route>
				</Routes>
			</HashRouter>
		</ThemeProvider>
	)
}

export default App
