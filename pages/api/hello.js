const hello=(req,res)=>{
  return res.status(200).json({message:"hello music"})
}

export default hello