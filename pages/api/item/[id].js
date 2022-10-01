import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

const getSingleItem = async (req, res) => {
  
  try {
    await connectDB();
    //mongo dbから特定の記事のIDを取ってくる
    const singleItem=await ItemModel.findById(req.query.id);
    return res.status(200).json({ message: "アイテム読み込み成功 シングル",singleItem:singleItem });
  } catch (error) {
    return res.status(400).json({ message: "アイテム読み込み失敗　シングル" });
  }
};

export default getSingleItem;
