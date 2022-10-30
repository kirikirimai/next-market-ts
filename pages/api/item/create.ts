import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

import auth from "../../../utils/auth";

import type { NextApiResponse } from "next";
import { ResMessageType, ExtendedNextApiRequetItem } from "../../../utils/types";

const createItem = async (req: ExtendedNextApiRequetItem, res: NextApiResponse<ResMessageType>) => {
  console.log(req.body)
  //でーたべすに接続
  try {
    await connectDB();
    await ItemModel.create(req.body);
    return res.status(200).json({ message: "アイテム作成成功" });
  } catch (error) {
    return res.status(400).json({ message: "アイテム作成しっぱい" });

  }
};

export default auth(createItem);
