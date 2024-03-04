import SignInForm from "#/components/form/sign-in-form"
import Link from "next/link"

export default function Page(){

    return(
        <main className="prose max-w-sm mx-auto py-12">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <SignInForm/>
            <div className="flex gap-2 max-w-sm p-4 mt-4 mx-auto rounded-md border-2 border-slate-200">
                <span>New to Web Workbench?</span>
                <Link href='/sign-up'>Create an account</Link>
            </div>
        </main>
    )
}
