import SignUpForm from "#/components/form/sign-up-form";

export default function Page(){
    return(
        <main id='sign-up-page' className="max-w-sm mx-auto py-12">

            <h2 className="text-2xl pb-2 font-bold">Sign Up</h2>

  

            <div className="mt-4">
                <SignUpForm/>
            </div>
        </main>
    )
}