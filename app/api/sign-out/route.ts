import { getSession } from "#/lib/iron-session";


export async function GET(){
    const session = await getSession()
    await session.destroy()
    return new Response('ad')
}