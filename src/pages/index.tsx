import { Table } from "../components/Table/Table";
import { useMemo } from "react";
import { Column } from "react-table";

import { trpc } from "@/utils/trpc"
import { useMediaQuery } from "@/hooks/useMediaQuery";

export type TableData = {
    name: string;
    email: string;
    phone?: string;
    info: {
        phone?: string;
        email: string;
    };
}

export default function Home() {
    const registrantsQuery = trpc.useQuery(['register.all'])
    const isMobile = useMediaQuery(768);

    const tableData: TableData[] = (registrantsQuery.data ?? []).map(registrant => ({
        name: `${registrant.firstName} ${registrant.lastName}`,
        email: registrant.email,
        phone: registrant.phone ?? undefined,
        info: {
            phone: registrant.phone ?? undefined,
            email: registrant.email
        }
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
        },
        {
            Header: 'Information',
            accessor: 'info',
            Cell: (props) => (
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Email</span>
                        <span>{props.value.email}</span>
                    </div>
                    {
                        props.value.phone ?
                            (
                                <div className="flex flex-col mt-5">
                                    <span className="text-xs text-gray-500">Phone</span>
                                    <span>{props.value.phone}</span>
                                </div>
                            )
                            : null
                    }
                </div>
            )
        }
    ], [])

    const hiddenColumns = isMobile ? ['email', 'phone'] : ['info'];

    return (
        <div className="flex flex-col">
            <div className="my-2 overflow-x-auto sm:mx-6 md:mx-8">
                <div className="py-2 align-middle inline-block min-w-full px-6 lg:px-8">
                    {
                        registrantsQuery.isLoading
                            ? 'Loading...'
                            : <Table className="shadow overflow-hidden border-b border-gray-200 rounded-md sm:rounded-lg" columns={columns} data={tableData} hiddenColumns={hiddenColumns} />
                    }
                </div>
            </div>
        </div >
    )
}