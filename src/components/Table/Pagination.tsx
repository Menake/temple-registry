import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from "@heroicons/react/solid"
import { TableState, UsePaginationInstanceProps } from "react-table"
import { Button, PageButton } from "../PageButton"


interface Props extends UsePaginationInstanceProps<any> {
    state: TableState<any>
}

export const Pagination = (props: Props) => (
    <div className="py-3 flex flex-1 items-center justify-between w-full">
        <div className="w-full flex flex-row min-w-screen justify-between sm:hidden">
            <Button onClick={() => props.previousPage()} disabled={!props.canPreviousPage}>Previous</Button>
            <Button onClick={() => props.nextPage()} disabled={!props.canNextPage}>Next</Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-x-2">
                <span className="text-sm text-gray-700">
                    Page <span className="font-medium">{props.state.pageIndex + 1}</span> of <span className="font-medium">{props.pageOptions.length}</span>
                </span>
                <select
                    className="text-sm text-gray-700"
                    value={props.state.pageSize}
                    onChange={e => {
                        props.setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <PageButton
                        className="rounded-l-md"
                        onClick={() => props.gotoPage(0)}
                        disabled={!props.canPreviousPage}
                    >
                        <span className="sr-only">First</span>
                        <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                        onClick={() => props.previousPage()}
                        disabled={!props.canPreviousPage}
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                        onClick={() => props.nextPage()}
                        disabled={!props.canNextPage
                        }>
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                        className="rounded-r-md"
                        onClick={() => props.gotoPage(props.pageCount - 1)}
                        disabled={!props.canNextPage}
                    >
                        <span className="sr-only">Last</span>
                        <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                </nav>
            </div>
        </div>
    </div>
)
