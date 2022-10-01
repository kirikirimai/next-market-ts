import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"
import jwt from "jsonwebtoken"

const secret_key="nextmarket"

const loginUser = async (req, res) => {

    try {
        await connectDB()
        //フォームから受けとったメールアドレスが存在してるかどうか
        const saveUserData = await UserModel.findOne({ email: req.body.email })
        if(saveUserData){
            //ユーザーが存在する場合
            if(req.body.password === saveUserData.password){
                //パスワードが正しい場合

                const payload={
                    email:req.body.email
                }
                
                const token=jwt.sign(payload,secret_key,{expiresIn:"23h"})

                console.log(token)

                return res.status(200).json({message:"ログイン成功",token:token})
            }else{
                return res.status(200).json({ message: "ログイン失敗：パスワードが違ってる" })
            }
        }else{//ユーザーが存在しない
            return res.status(200).json({ message: "ログイン失敗：ユーザー登録してください" })
        }


    } catch (error) {

        return res.status(400).json({ message: "ログイン失敗" })
    }
}

export default loginUser