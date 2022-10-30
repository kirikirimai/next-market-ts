import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

import type { NextApiRequest, NextApiResponse } from "next";
import { SavedItemDataType, ResReadAllType } from "../../../utils/types";

const getAllItems = async (req: NextApiRequest, res: NextApiResponse<ResReadAllType>) => {
  try {

    await connectDB();
    const allItems: SavedItemDataType[] = await ItemModel.find();
    return res.status(200).json({ message: "アイテム読み込み成功", allItems: allItems });

  } catch (error) {
    return res.status(400).json({ message: "アイテム読み込み失敗" });
  }
};

export default getAllItems;
