import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";

const deleteItem = async (req, res) => {
    try {
        await connectDB();
        //mongo dbから特定の記事をアップデートする
        const singleItem = await ItemModel.findById(req.query.id)
        if (singleItem.email === req.body.email) {
            await ItemModel.deleteOne({ _id: req.query.id })
            return res.status(200).json({ message: "アイテム削除成功" });
        }else{
            throw new Error()
        }
    } catch (error) {
        return res.status(400).json({ message: "アイテム削除失敗" });
    }
}
export default auth(deleteItem)