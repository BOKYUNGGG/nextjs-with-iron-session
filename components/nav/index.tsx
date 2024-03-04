'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import { signOutAction } from "#/actions/auth"
import { useRouter } from "next/navigation"
import Image from "next/image"
import clsx from "clsx"

export function NavbarContainer(){
    const [username, setUsername] = useState<undefined | string>(undefined)
    const [isSignIn, setIsSignIn] = useState(false)
    
    useEffect(()=>{
        async function fetchAndSetUsername(){
            const res = await fetch('/api/session/status')
            if(!res.ok) {
                // sever error handling
                return
            }
            else {
                const json = await res.json() as any
                if(!json.username) return
                console.log('json :', json)
                setUsername(json.username)
                setIsSignIn(true)
            }
        }
        fetchAndSetUsername()
        return ()=>{
            setUsername(undefined)
            setIsSignIn(false)
        }
    }, [])

    const signOutHandler = () => {
        setIsSignIn(false)
    }
    const signInHandler = () => {
        setIsSignIn(true)
    }
    return(
        <Navbar
            isSignIn={isSignIn}
            username={username}
            signOutHandler={signOutHandler}
            signInHandler={signInHandler}
        />
    )
}

type NavbarProps = {
    isSignIn : boolean;
    username : string | undefined,
    signOutHandler : ()=>void;
    signInHandler : ()=>void
}
function Navbar(props : NavbarProps){
    const [isOpenUserAccountIcon, setIsOpenUserAccountIcon] = useState(false)
    const router = useRouter()
    const toggleHandler = () => {
        setIsOpenUserAccountIcon(!isOpenUserAccountIcon)
    }
    async function submitHandler(){
        const res = await fetch('/api/sign-out')
        props.signOutHandler()
    }
    return(
        <nav className="flex px-4 h-16 justify-between items-center border-b-2 border-gray-200">
            {/* Logo */}
            <Link href='/'>
                <Image src='/kasio.svg' width={154} height={30} alt="kasio"/>
            </Link>
            
            {/* User Account Icon */}
            {
                props.isSignIn && 
                <div className="">
                    <button className="" onClick={toggleHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline m-1 w-6 h-6">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <span className="inline m-1 font-bold">{props.username}</span>
                        <svg opacity="0.5" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="inline  m-1">
                            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                        </svg>
                    </button>    
                    <div className={clsx('absolute right-4 top-20 ring-1 py-2 ring-slate-900/5 rounded-md shadow-lg bg-sky-300', {'hidden' : !isOpenUserAccountIcon})}>
                        <div className="">
                            <span>{props.username}</span>
                        </div>
                        <div className="flex px-4 flex-col gap-1 bg-white">
                            <Link href=''>My Connections</Link>
                            <Link href=''>My Account</Link>
                            <Link href=''>My Preferences</Link>
                        </div>
                        <div className="flex flex-row justify-center py-2.5 bg-white">
                            <form onSubmit={submitHandler}><button type="submit" className="rounded-md ring-slate-900 ring-1 px-2.5 py-1">Sign Out</button></form>
                        </div>
                    </div>
                </div>
            }
            {/* Button for navigation to /sign-in */}
            {
                !props.isSignIn &&

                <Link href='/sign-in' className="px-2 py-1 flex items-center gap-1 ring-1 ring-black rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
                    </svg>
                    <span>sign in</span>
                </Link>
            }
            
        </nav>
    )
}