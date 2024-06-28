import { DependencyContainer } from 'tsyringe'
import StartupManager from './application/implementations/startup/startupManager'

export async function preStart(container: DependencyContainer) {
	const startupManager = container.resolve(StartupManager)
	await startupManager.init()
}
