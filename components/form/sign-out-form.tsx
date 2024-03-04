'use client'
import { signOutAction } from "#/actions/auth"

export default function SignOutForm(){


    return(
        <form 
            className="w-96 m-auto bg-red-500"
            action={signOutAction}>
                <button type="submit">Submit</button>
        </form>
    )
}