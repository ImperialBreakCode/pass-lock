interface LeftNavMenuBoxProps {
	children: React.ReactNode
}

function LeftNavMenuBox({ children }: LeftNavMenuBoxProps) {
	return (
		<div className="h-full border border-transparent border-r-border bg-card pr-10 pl-5 py-6">
			{children}
		</div>
	)
}

export default LeftNavMenuBox
