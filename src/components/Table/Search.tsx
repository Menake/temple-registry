import { SearchIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { Row, useAsyncDebounce } from "react-table"


interface GlobalFilterProps {
    setGlobalFilter: (filterValue: any) => void;
    globalFilter: any;
}


export const Search = ({ globalFilter, setGlobalFilter }: GlobalFilterProps) => {
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <div className='flex flex-row items-center justify-start px-2 py-1 border placeholder-gray-500 text-gray-900 rounded-md w-72 mb-3'>
            <SearchIcon className="h-5 w-5 text-gray-400 mr-5" />
            <input
                className="focus:outline-none"
                type='text'
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder='Search ...'
            />
        </div>
    )
}