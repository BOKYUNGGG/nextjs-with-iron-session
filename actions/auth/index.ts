'use server'
import { getSession } from '#/lib/iron-session/index'
import { redirect } from 'next/navigation'
import authDB from '#/lib/db'
import crypto from 'crypto'
import chalk from 'chalk'
import { revalidatePath } from 'next/cache'




export async function signInAction(prevState : any, formData : FormData){
    console.log('==================================')
    console.log('server action [signIn] invoked')
    const user = Object.fromEntries(formData)
    const session = await getSession()
    console.log('user : ', user)

    session.username = user.username as string

    await session.save()
    await revalidatePath('/')
    await redirect('/')
}





/**
 * 회원가입을 위한 server-action입니다. 이 함수에서 수행되는 작업은 다음과 같습니다.
 * 1. password 검증
 * 2. 유저 username 중복검사
 * 3. 유저 등록
 * 4. 세션 생성
 * @param prevState 
 * @param formData 
 * @returns 
 */
export async function signUpAction(prevState : any, formData : FormData){
    console.log(chalk.bgGray.white('Sign Up Action invoked...'))
    const user = Object.fromEntries(formData) as {
        username : string;
        password : string;
        'password-repeat' : string
    }

    // 1. check the password repeat...
    console.log(chalk.white('1. check the password repeat...'))
    if(user.password !== user['password-repeat']){
        console.log(chalk.redBright('- password is not same password-repeat'))
        return {
            isSignUped : false,
            password : 'Check your password again'
        }
    }
    console.log(chalk.blue('- check over'))


    // 2. check the duplicate uesr... 
    console.log(chalk.white('2. check the duplicate uesr...'))
    const res1 = await checkDuplicateUsername(user.username) as any
    if(!res1.ok){
        console.log(chalk.red('- ',res1.message))
        return {
            isSignUped : false,
            ...res1
        }
    }
    console.log(chalk.blue('- check over'))

    // 3. register a user to database...
    console.log(chalk.white('3. register a user to database...'))
    const res2 = await registerUser(user.username, user.password) as any
    if(!res2.ok){
        console.log(chalk.red('- ',res2.message))
        return {
            isSignUped : false,
            ...res2
        }
    }
    console.log(chalk.blue('- check over'))
    console.log(chalk.blue('- User Created!'))
    
    // 4. session 생성
    const session = await getSession()
    session.username = user.username
    await session.save()
    await redirect('/')
}





export async function signOutAction(){
    const session = await getSession()
    await session.destroy()
    await revalidatePath('/')
    await redirect('/')
}





async function checkDuplicateUsername(username : string){
    return new Promise(resolve => {
        authDB.get('SELECT * FROM users WHERE username = $username', {
            $username : username
        }, function(err, row){
            if(err) {
                resolve({
                    ok : false,
                    message : "Database Error"
                })
                return
            }
            else if(row){
                resolve({
                    ok : false,
                    message : 'Duplicated user',
                    username : "이미 등록된 아이디입니다."
                })
                return
            }
            resolve({
                ok : true,
            })
        })
    })
}
async function registerUser(username : string, password : string){
    return new Promise(resolve => {
        const salt = crypto.randomBytes(16)
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword){
            if(err) {
                console.log('Hashing Error')
                resolve({
                    ok : false,
                    message : '- HaShing Error'
                })
                return
            }
            
            authDB.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                username,
                hashedPassword,
                salt
            ], function(this, err){
                if(err) {
                    console.log('Error invoked in register user')
                    console.log('Error : ', err)
                    resolve({
                        ok : false,
                        message : '- Insert user to Database Error'
                    })
                    return
                }
                
                // successful user creation
                console.log(`User ${username} is created with id : ${this.lastID}`)
                resolve({
                    ok : true,
                })
            })
        })
    })
}
