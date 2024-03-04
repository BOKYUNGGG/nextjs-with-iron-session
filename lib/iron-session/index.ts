import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { SessionOptions } from 'iron-session'

/**
 * Get the session from the client browser cookie. 
*/
export async function getSession(){
    console.log('========================================')
    const session = await getIronSession<TSession>(cookies(),sessionOptions)
    console.log('사용자가 세션 정보를 보냈습니다.')
    console.log('session = ', session)
    console.log('========================================')

    return session
}
export type TSession = {
    username : string;
    isSignIn : boolean
}


export const sessionOptions : SessionOptions= {
    cookieName : 'nextjs-with-iron-session',
    password : 'my-secret-at-least-thirty-two-characters',
    cookieOptions : {
    }
} 