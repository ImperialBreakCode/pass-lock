interface PageWrapperProps {
	children: React.ReactNode
}

function PageWrapper({ children }: PageWrapperProps) {
	return <div className="h-full p-5">{children}</div>
}

export default PageWrapper
