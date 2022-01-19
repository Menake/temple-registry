import { Table } from "../components/Table/Table";
import { useMemo } from "react";
import { Column } from "react-table";

import { trpc } from "@/utils/trpc"

export type TableData = {
    name: string;
    email: string;
    phone?: string;
}

export default function Home() {
    const registrantsQuery = trpc.useQuery(['register.all'])
    const tableData: TableData[] = (registrantsQuery.data ?? []).map(registrant => ({
        name: `${registrant.firstName} ${registrant.lastName}`,
        email: registrant.email,
        phone: registrant.phone ?? undefined
    }));

    const columns = useMemo<Column<TableData>[]>(() => [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        }
    ], [])

    return (
        <div className="flex flex-col">
            <div className="my-2 overflow-x-auto sm:mx-6 md:mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    {
                        registrantsQuery.isLoading ? 'Loading...' :
                            <Table className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" columns={columns} data={tableData} />
                    }

                </div>
            </div>
        </div >
    )
}