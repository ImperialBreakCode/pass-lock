import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { ReactNode } from 'react'

interface SideSheetProps {
	title: string
	children: ReactNode
	description: string
	open?: boolean | undefined
	onOpenChange?: (open: boolean) => void
}

function SideSheet({ children, description, title, open, onOpenChange }: SideSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="text-foreground border-l-border">
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				<div>{children}</div>
			</SheetContent>
		</Sheet>
	)
}

export default SideSheet
