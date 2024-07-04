import { ErrorDialogueContext } from '@/contexts/ContextWrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '../ui/form'
import FormInputWrapper from '@/elements/FormInputWrapper'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import AccountInfo from '@/models/accountInfo.type'

interface AddUpdateAccountFormProps {
	onSuccessfullSubmit: () => void
	serviceId: string
	accountToUpdate?: AccountInfo | undefined
}

const formSchema = z.object({
	username: z.string().min(1, { message: 'Name is required' }).max(25),
	password: z.string().min(1, { message: 'Password is required' }).max(25),
	moreInfo: z.string().max(100)
})

function AddUpdateAccountForm({
	onSuccessfullSubmit,
	serviceId,
	accountToUpdate
}: AddUpdateAccountFormProps) {
	const [, setErrors] = useContext(ErrorDialogueContext)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: accountToUpdate?.username ?? '',
			password: accountToUpdate?.password ?? '',
			moreInfo: accountToUpdate?.moreInfo ?? ''
		},
		mode: 'onChange'
	})

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		let result

		if (accountToUpdate) {
			result = await window.api.updateAccountInfo(
				{
					id: accountToUpdate.id,
					...data
				},
				serviceId
			)
		} else {
			result = await window.api.addAccountInfo({
				...data,
				serviceId: serviceId
			})
		}

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
					name="username"
					render={({ field }) => (
						<FormInputWrapper label="Username">
							<Input {...field} placeholder="Enter a username..." />
						</FormInputWrapper>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormInputWrapper label="Password">
							<Input {...field} placeholder="Enter a password..." />
						</FormInputWrapper>
					)}
				/>
				<FormField
					control={form.control}
					name="moreInfo"
					render={({ field }) => (
						<FormInputWrapper label="More information about the account">
							<Textarea {...field} placeholder="Info..." />
						</FormInputWrapper>
					)}
				/>
				<Button type="submit">{accountToUpdate ? 'Save' : 'Add'}</Button>
			</form>
		</Form>
	)
}

export default AddUpdateAccountForm
