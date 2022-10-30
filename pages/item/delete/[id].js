import Image from "next/image"
import Head from "next/head"
import useAuth from "../../utils/useAuth"

const DeleteItem = (props) => {
    console.log(props)
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://vercel.com/kirikirimai/next-market-ts/EfEmugQTfvk87fdtj3tUx9TVitN3api/item/delete/${props.singleItem._id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })

            const jsonData = await response.json()
            alert(jsonData.message)

        } catch (error) {
            alert("アイテム編集失敗")
        }
    }

    const loginuser=useAuth()
    console.log(loginuser)

    if(loginuser===props.singleItem.email){
        return (
            <div className="delete-page">
                <Head><title>アイテム削除</title></Head>
                <h1 className="page-title">アイテム削除</h1>
    
                <form onSubmit={handleSubmit}>
                    <h2>{props.singleItem.title}</h2>
                    <Image src={props.singleItem.image} width="750px" height="500px" alt="image " />
                    <h3>￥{props.singleItem.price}</h3>
                    
                    <p>{props.singleItem.description}</p>
                    <button>削除</button>
                </form>
            </div>
        )
    }else{
        return <h1>権限がありません。</h1>
    }

    
}

export default DeleteItem

export const getServerSideProps = async (context) => {

    const response = await fetch(`https://vercel.com/kirikirimai/next-market-ts/EfEmugQTfvk87fdtj3tUx9TVitN3api/item/${context.query.id}`)
    const singleItem = await response.json()

    return {
        props: singleItem
    }
}