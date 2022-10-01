import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";

const updateItem = async (req, res) => {

    try {
        await connectDB();
        //mongo dbから特定の記事をアップデートする
        const singleItem = await ItemModel.findById(req.body.id)
        //アイテムに登録されてるメアドと一致してるか
        if (singleItem.email === req.body.email) {
            await ItemModel.updateOne({ _id: req.query.id }, req.body)
            return res.status(200).json({ message: "アイテム編集成功" });
        } else {
            throw new Error()
        }

    } catch (error) {
        return res.status(400).json({ message: "アイテム編集失敗" });
    }
}
export default auth(updateItem)