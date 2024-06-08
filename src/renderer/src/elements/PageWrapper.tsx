interface PageWrapperProps {
	children: React.ReactNode
}

function PageWrapper({ children }: PageWrapperProps) {
	return <div className="h-full p-5 pb-0 flex flex-col">{children}</div>
}

export default PageWrapper
