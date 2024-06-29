import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormInputWrapper from '@/elements/FormInputWrapper'
import { useContext } from 'react'
import { ErrorDialogueContext } from '@/contexts/ContextWrapper'

interface AddServiceFormProps {
	onSuccessfullSubmit: () => void
}

const formSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }).max(50)
})

function AddServiceForm({ onSuccessfullSubmit }: AddServiceFormProps) {
	const [, setErrors] = useContext(ErrorDialogueContext)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ''
		},
		mode: 'onChange'
	})

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const result = await window.api.insertService(data.name)

		if (typeof result === 'string' && setErrors) {
			setErrors(result)
		}

		onSuccessfullSubmit()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormInputWrapper label="Service Name">
							<Input {...field} placeholder="Enter service name..." />
						</FormInputWrapper>
					)}
				/>
				<Button type="submit">Add</Button>
			</form>
		</Form>
	)
}

export default AddServiceForm
