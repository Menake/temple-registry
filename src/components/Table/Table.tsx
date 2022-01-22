import { useEffect } from 'react'
import { Column, useTable, useGlobalFilter, useSortBy, usePagination, TableState } from 'react-table'  // new
import { SortDownIcon, SortIcon, SortUpIcon } from '../Icons'
import { Pagination } from './Pagination'
import { Search } from './Search'

interface Props {
    className: string;
    data: any[];
    columns: Column<any>[];
    hiddenColumns?: string[];
}

export const Table = (props: Props) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        setHiddenColumns,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable({ columns: props.columns, data: props.data }, useGlobalFilter, useSortBy, usePagination)

    useEffect(() => {
        if (props.hiddenColumns)
            setHiddenColumns(props.hiddenColumns)
    }, [props.hiddenColumns])

    const pageSelectProps = {
        page,
        state,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize
    }

    return (
        <>
            <Search globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
            <table className={`min-w-full divide-y divide-gray-200 ${props.className}`} {...getTableProps()}>
                <thead className="bg-gray-200">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    scope="col"
                                    className={`group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    <div className="flex items-center justify-between">
                                        {column.render('Header')}
                                        {/* Add a sort direction indicator */}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                    : <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                : (
                                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                )}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200">
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}
                                        className="px-6 py-4 whitespace-nowrap text-sm">
                                        {cell.render("Cell")}
                                    </td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Pagination {...pageSelectProps} />
        </>
    )
}
