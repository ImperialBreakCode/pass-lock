interface PageHeadingProps {
	children: React.ReactNode
}

function PageHeading({ children }: PageHeadingProps) {
	return <h2 className="text-2xl font-medium">{children}</h2>
}

export default PageHeading
