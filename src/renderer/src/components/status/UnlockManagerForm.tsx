import { KeysContext } from '@/contexts/KeysContextProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '../ui/form'
import FormInputWrapper from '@/elements/FormInputWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'

interface UnlockManagerFormProps {
	onSuccessfullSubmit: () => void
}

const formSchema = z.object({
	masterPassword: z.string().min(1)
})

function UnlockManagerForm({ onSuccessfullSubmit }: UnlockManagerFormProps) {
	const [, setKeys] = useContext(KeysContext)
	const [, setError] = useContext(ErrorDialogueContext)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange'
	})

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const keys = window.api.deriveKeys(data.masterPassword)

		const testResult = await window.api.tryDecription(keys)
		if (testResult) {
			if (setError && testResult === 'Data verification failed') {
				setError('Master password is incorrect. Please try again.')
			}

			return
		}

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
				<Button type="submit">Unlock Storage</Button>
			</form>
		</Form>
	)
}

export default UnlockManagerForm
