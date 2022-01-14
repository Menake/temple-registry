import { Formik } from "formik";
import { FormInput } from "./FormInput";
import { object, string, InferType } from 'yup';
import { trpc } from "@/utils/trpc";
import Image from "next/image"

const registrantSchema = object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().required('Email is required').email('Email is not valid'),
    phone: string()
})

export type Registrant = InferType<typeof registrantSchema>

interface Props {
    onSubmit: (values: Registrant) => void
}

export const Form = (props: Props) => {
    const mutation = trpc.useMutation(['register.add'])

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: undefined
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={registrantSchema}
            onSubmit={props.onSubmit}>
            {props => (
                <form className="mt-8 space-y-6 h-1/3" onSubmit={props.handleSubmit}>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Temple Registry</h2>
                    {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
                    <div className="rounded-md">
                        <div className="py-3">
                            <label htmlFor="firstName" className="sr-only">
                                First name
                            </label>
                            <FormInput
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={props.handleChange}
                                value={props.values.firstName}
                                placeholder="First name"
                                error={props.errors.firstName}
                            />

                        </div>
                        <div className="py-3">
                            <label htmlFor="lastName" className="sr-only">
                                Last name
                            </label>
                            <FormInput
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={props.handleChange}
                                value={props.values.lastName}
                                placeholder="Last name"
                                error={props.errors.lastName}
                            />
                        </div>
                        <div className="py-3">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <FormInput
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={props.handleChange}
                                value={props.values.email}
                                placeholder="Email address"
                                error={props.errors.email}
                            />
                        </div>
                        <div className="py-3">
                            <label htmlFor="phone" className="sr-only">
                                Phone number
                            </label>
                            <FormInput
                                id="phone"
                                name="phone"
                                type="text"
                                autoComplete="phone"
                                onChange={props.handleChange}
                                value={props.values.phone}
                                placeholder="Phone number"
                                error={props.errors.phone}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik >
    )

}
