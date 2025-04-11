import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '../ui/form'
import FormInputWrapper from '@/elements/FormInputWrapper'
import { Input } from '../ui/input'
import { KeysContext } from '@/contexts/KeysContextProvider'
import { Button } from '../ui/button'

interface SetMasterPasswordDialogProps {
	onSuccessfullSubmit: () => void
}

const formSchema = z
	.object({
		masterPassword: z
			.string()
			.min(8, { message: 'Master password should be at least 8 symbols long' })
			.max(60, { message: 'Master password should be at most 60 symbols long' }),
		confirmPassword: z.string()
	})
	.refine((data) => data.masterPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	})

function SetMasterPasswordDialog({ onSuccessfullSubmit }: SetMasterPasswordDialogProps) {
	const [, setKeys] = useContext(KeysContext)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange'
	})

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const keys = window.api.deriveKeys(data.masterPassword)
		setKeys(keys)

		onSuccessfullSubmit()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-7">
				<FormField
					control={form.control}
					name="masterPassword"
					render={({ field }) => (
						<FormInputWrapper label="Master Password">
							<Input {...field} placeholder="Enter master password" type="password" />
						</FormInputWrapper>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormInputWrapper label="Confirm Master Password">
							<Input
								{...field}
								placeholder="Enter again your master password"
								type="password"
							/>
						</FormInputWrapper>
					)}
				/>
				<Button type="submit">Set Master Password</Button>
			</form>
		</Form>
	)
}

export default SetMasterPasswordDialog
