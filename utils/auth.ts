
import jwt from "jsonwebtoken"
import type { NextApiRequest, NextApiResponse } from "next"
import { DecodedType, ExtendedNextApiRequestAuth, ResMessageType } from "./types";

const secret_key = "nextmarket"

const auth = (handler: Function) => {
    return async (req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
        //
        if (req.method === "GET") {
            return handler(req, res)
        }

        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvLnJldm9sdXRpb24ubm8zQGdtYWlsLmNvbSIsImlhdCI6MTY2NDczMDU2NywiZXhwIjoxNjY0ODEzMzY3fQ.de2IdBlWiYpLTN7QgmbvhPr648Tl_W1JiIrlUGJagwQ"
        const token = await req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "トークンがありません" })
        }

        try {
            const decoded = jwt.verify(token, secret_key)
            //ログインしてるのが確認できたらメールアドレスを保存しておく
            //削除・修正する際にアイテムを作成したユーザーかどうかをメールアドレスで判定するのに使用
            req.body.email = (decoded as DecodedType).email
            return handler(req, res)
        } catch (error) {
            return res.status(401).json({ message: "トークが正しくないのでログインしてください" })
        }
    }
}

export default auth