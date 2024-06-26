import { ThemeProvider } from './components/ThemeProvider'
import { HashRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/baseLayout'
import StatusPage from './pages/StatusPage'
import { routes } from './routes'
import Vault from './pages/Vault'
import AccountInfos from './pages/AccountInfos'
import ContextWrapper from './contexts/ContextWrapper'

function App(): JSX.Element {
	return (
		<ContextWrapper>
			<ThemeProvider>
				<HashRouter>
					<Routes>
						<Route path={routes.baseRoute} element={<BaseLayout />}>
							<Route index element={<StatusPage />} />
							<Route path={routes.vault}>
								<Route index element={<Vault />} />
								<Route path={routes.accountInfos} element={<AccountInfos />} />
							</Route>
						</Route>
					</Routes>
				</HashRouter>
			</ThemeProvider>
		</ContextWrapper>
	)
}

export default App
