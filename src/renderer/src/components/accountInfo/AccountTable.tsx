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
	onClickRow: (id: string) => void
}

function AccountTable({ data, onClickRow }: AccountTableProps) {
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
						<TableRow
							onClick={() => onClickRow(account.id)}
							key={account.id}
							className="border-b-border cursor-pointer"
						>
							<TableCell>
								{account.username.length < 30
									? account.username
									: account.username.slice(0, 30) + '...'}
							</TableCell>
							<TableCell>
								{account.password.length < 30
									? account.password
									: account.password.slice(0, 30) + '...'}
							</TableCell>
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
