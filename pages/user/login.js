import { useState } from "react"
import Head from "next/head"


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await fetch("https://vercel.com/kirikirimai/next-market-ts/EfEmugQTfvk87fdtj3tUx9TVitN3api/user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const jsonData = await response.json()
            localStorage.setItem("token", jsonData.token)
            alert(jsonData.message)
        } catch (error) {
            alert("ログイン失敗")
        }
    }

    return (
        <div>

            <Head><title>ユーザーログイン</title></Head>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login