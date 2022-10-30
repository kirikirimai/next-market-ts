import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"
import jwt from "jsonwebtoken"

import type { NextApiResponse } from "next"
import { ExtendedNextApiRequestUser, ResMessageType, SavedUserDataType } from "../../../utils/types"

const secret_key="nextmarket"

const loginUser = async (req:ExtendedNextApiRequestUser, res:NextApiResponse<ResMessageType>) => {
    try {
      
        await connectDB()
        //フォームから受けとったメールアドレスが存在してるかどうか
        const saveUserData:SavedUserDataType | null = await UserModel.findOne({ email: req.body.email })
        if(saveUserData){
            //ユーザーが存在する場合
            if(req.body.password === saveUserData.password){
                //パスワードが正しい場合

                const payload={
                    email:req.body.email
                }
            
                const token=jwt.sign(payload,secret_key,{expiresIn:"23h"})
                
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