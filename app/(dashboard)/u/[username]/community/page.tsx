import { getBlockedUsers } from "@/lib/blockedService";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import moment from 'moment'


type Props = {}


const Page = async ({ }: Props) => {
    const blockedUsers = await getBlockedUsers()
    const formattedData = blockedUsers.map(block => ({
        ...block,
        userID: block.blocked.id,
        imageURL: block.blocked.imageURL,
        username: block.blocked.username,
        createdAt: moment(new Date(block.blocked.createdAt)).format('MM/DD/yyyy')
    }))
    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="font-bold text-2xl">Community Settings</h1>
            </div>
            <DataTable columns={columns}
                data={formattedData} />
        </div>
    )
}

export default Page