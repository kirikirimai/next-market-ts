import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

import auth from "../../../utils/auth";

const createItem = async (req, res) => {
  //でーたべすに接続
  try {
    await connectDB();
    await ItemModel.create(req.body);
    return res.status(200).json({ message:"アイテム作成成功" });
  } catch (error) {
    return res.status(400).json({ message:"アイテム作成しっぱい" });

  }
};

export default auth(createItem);
