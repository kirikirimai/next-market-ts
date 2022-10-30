import { useState } from "react"
import Head from "next/head"
import useAuth from "../../utils/useAuth"

const CreateItem = () => {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
           const response = await fetch("https://vercel.com/kirikirimai/next-market-ts/EfEmugQTfvk87fdtj3tUx9TVitN3api/item/create", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description
                })
            })

            const jsonData=await response.json()
            alert(jsonData.message)

        } catch (error) {
            alert("アイテム作成失敗")
        }
    }

    const loginuser=useAuth()
    console.log(loginuser)

    if(loginuser){
        return (
            <div>
                <Head><title>アイテム作成</title></Head>
                <h1 className="page-title">アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required />
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required />
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" row={15} placeholder="商品説明" required></textarea>
                    <button>登録</button>
                </form>
    
            </div>
        )
    }

   
}

export default CreateItem