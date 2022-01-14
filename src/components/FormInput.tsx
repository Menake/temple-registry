import { ErrorMessage, Field, FieldAttributes } from "formik"

interface Props extends FieldAttributes<any> {
    error?: string;
}

export const FormInput = (props: Props) => {
    const focus = 'focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm'
    const border = props.error ? 'border-red-500' : 'border-gray-300'

    return (
        <>
            <Field
                className={`relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md ${focus} ${border}`}
                {...props} />
            <ErrorMessage name={props.name ?? 'name'} render={msg => <div className="text-red-500 text-xs text-left pt-2">{msg}</div>} />
        </>
    )
}