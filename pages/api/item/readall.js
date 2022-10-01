import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

const getAllItems = async (req, res) => {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return res.status(200).json({ message: "アイテム読み込み成功",allItems:allItems });
  } catch (error) {
    return res.status(400).json({ message: "アイテム読み込み失敗" });
  }
};

export default getAllItems;
