import { getSession } from "#/lib/iron-session"


/**
 * 사용자의 인증 상태를 위한 API
 * @returns 
 */
export async function GET(){
    const session = await getSession()
    if(!session.username){
        return Response.json({
            isSignIned : false
        })
    }

    return Response.json({
        isSigned : true,
        username : session.username
    })
}

export async function POST(){

}