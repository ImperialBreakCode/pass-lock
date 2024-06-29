import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface FormInputWrapperProps {
	label: string
	children: React.ReactNode
}

function FormInputWrapper({ label, children }: FormInputWrapperProps) {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>{children}</FormControl>
			<FormMessage />
		</FormItem>
	)
}

export default FormInputWrapper
