import { ThemeProvider } from './components/ThemeProvider'
import { HashRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/baseLayout'
import StatusPage from './pages/StatusPage'
import { routes } from './routes'
import PassVault from './pages/PassVault'

function App(): JSX.Element {
	return (
		<ThemeProvider>
			<HashRouter>
				<Routes>
					<Route path={routes.baseRoute} element={<BaseLayout />}>
						<Route index element={<StatusPage />} />
						<Route path={routes.passVault} element={<PassVault />} />
					</Route>
				</Routes>
			</HashRouter>
		</ThemeProvider>
	)
}

export default App
