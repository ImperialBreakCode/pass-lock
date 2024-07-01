import AccountInfo from '@/models/accountInfo.type'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '../ui/table'

interface AccountTableProps {
	data: AccountInfo[]
}

function AccountTable({ data }: AccountTableProps) {
	return (
		<div className="mt-4">
			<Table>
				<TableCaption className="text-left">Account list</TableCaption>
				<TableHeader>
					<TableRow className="border-b-border">
						<TableHead>Username</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Info</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((account) => (
						<TableRow key={account.id} className="border-b-border cursor-pointer">
							<TableCell>{account.username}</TableCell>
							<TableCell>{account.password}</TableCell>
							<TableCell>
								{account.moreInfo.length < 30
									? account.moreInfo
									: account.moreInfo.slice(0, 30) + '...'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default AccountTable
