
import jwt from "jsonwebtoken"

const secret_key = "nextmarket"


const auth = (handler) => {
    return async (req, res) => {
        //
        if (req.method === "GET") {
            return handler(req, res)
        }

        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvLnJldm9sdXRpb24ubm8zQGdtYWlsLmNvbSIsImlhdCI6MTY2NDYyOTc5NywiZXhwIjoxNjY0NzEyNTk3fQ._lcLYVpYiZKa5WWNB4EYNz716CU-dTOtzrj7eGux97U"
        // const token = await req.headers.authorization.split("")[1]
        if (!token) {
            return res.status(401).json({ message: "トークンがありません" })
        }

        try {
            const decoded = jwt.verify(token, secret_key)
            //ログインしてるのが確認できたらメールアドレスを保存しておく
            //削除・修正する際にアイテムを作成したユーザーかどうかをメールアドレスで判定するのに使用
            req.body.email=decoded.email
            return handler(req,res)
        } catch (error) {
            return res.status(401).json({ message: "トークが正しくないのでログインしてください" })
        }
    }
}

export default auth