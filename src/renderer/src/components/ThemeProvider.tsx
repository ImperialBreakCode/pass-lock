import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

type ThemeProviderState = {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme
	)

	const changeColorMode = (dark: boolean, root: HTMLElement) => {
		const systemTheme = dark ? 'dark' : 'light'
		root.classList.remove('light', 'dark')
		root.classList.add(systemTheme)
	}

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const matchDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			changeColorMode(matchDark, root)

			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				changeColorMode(e.matches, root)
			})
			return
		}

		root.classList.add(theme)

		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', (e) => {
				changeColorMode(e.matches, root)
			})
		}
	}, [theme])

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme)
			setTheme(theme)
		}
	}

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext)

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

	return context
}
