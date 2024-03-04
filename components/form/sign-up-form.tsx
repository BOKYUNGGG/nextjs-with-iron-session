'use client'
import { useFormState, useFormStatus } from "react-dom"
import { signUpAction } from "#/actions/auth"
import clsx from "clsx"

export default function SignUpForm(){
    const [state, formAction] = useFormState<any, any>(signUpAction, null)

    return(
        <form 
            className="max-w-sm mx-auto"
            action={formAction}>
                <section className="mb-5">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="username">Username</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" name="username" id="username" required
                    />
                    <p>{state?.username}</p>
                </section>
                <section className="mb-5">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="password">Password</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password" name="password" id="password" required
                    />
                </section>
                <section className="mb-5">
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="password-repeat">Repeat Password</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password" name="password-repeat" id="password-repeat" required
                    />
                </section>
                <p>{state?.password}</p>
               
                <SubmitButton/>


                <pre>{JSON.stringify(state, null, 2)}</pre>
        </form>
    )
}

function SubmitButton(){
    const {pending, } = useFormStatus()

    return(
        <button
            type='submit'
            className={clsx(
                'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800', {
                    pending : 'bg-gray-500'
                }
            )}
        >
            {pending ? "Submitting..." : 'Submit'}
        </button>
    )
}