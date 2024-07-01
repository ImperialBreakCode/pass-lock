import { ErrorDialogueContext } from '@/contexts/ContextWrapper'
import ServiceInfo from '@/models/serviceInfo.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '../ui/form'
import FormInputWrapper from '@/elements/FormInputWrapper'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface DeleteServiceFormProps {
	onSuccessfullSubmit: () => void
	service: ServiceInfo
}

function DeleteServiceForm({ onSuccessfullSubmit, service }: DeleteServiceFormProps) {
	const formSchema = z.object({
		name: z.string().regex(new RegExp(`^${service.name}$`))
	})

	const [, setErrors] = useContext(ErrorDialogueContext)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ''
		},
		mode: 'onChange'
	})

	const onSubmit = async () => {
		const result = await window.api.deleteService(service.id)

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
				<Button type="submit" variant={'destructive'}>
					Delete
				</Button>
			</form>
		</Form>
	)
}

export default DeleteServiceForm
