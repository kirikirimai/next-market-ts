import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";

import type { NextApiResponse } from "next";
import { ExtendedNextApiRequetItem, SavedItemDataType, ResMessageType } from "../../../../utils/types";

const updateItem = async (req:ExtendedNextApiRequetItem, res: NextApiResponse<ResMessageType>) => {

    try {
        await connectDB();
        //mongo dbから特定の記事をアップデートする
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id)
        if (!singleItem) return res.status(400).json({ message: "アイテムが存在していないため編集失敗" })
        //アイテムに登録されてるメアドと一致してるか
        if (singleItem.email === req.body.email) {
            await ItemModel.updateOne({ _id: req.query.id }, req.body)
            return res.status(200).json({ message: "アイテム編集成功ｓｓｓ" });
        } else {
            throw new Error()
        }

    } catch (error) {
        return res.status(400).json({ message: "アイテム編集失敗" });
    }
}
export default auth(updateItem)