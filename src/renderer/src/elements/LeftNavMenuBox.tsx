interface LeftNavMenuBoxProps {
	children: React.ReactNode
}

function LeftNavMenuBox({ children }: LeftNavMenuBoxProps) {
	return (
		<div className="h-full border border-transparent border-r-border px-3 py-6">{children}</div>
	)
}

export default LeftNavMenuBox
