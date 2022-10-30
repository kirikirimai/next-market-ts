import Link from "next/link"
import Image from "next/image"
import Head from "next/head"

const ReadAllItems = (props) => {
  return (
    <div>
      <Head><title>NEXT MARKET</title></Head>
      <div className="grid-container-in">
        {props.allItems.map(item =>
          <Link href={`/item/${item._id}`} key={item._id}>
            <a>
              <Image src={item.image} width="750px" height="550px" />
              <div>
                <h2>￥{item.price}</h2>
                <h3>{item.title}</h3>
                <p>{item.description.substring(0.40)}...</p>
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ReadAllItems

export const getServerSideProps = async () => {
  const response = await fetch("https://vercel.com/kirikirimai/next-market-ts/EfEmugQTfvk87fdtj3tUx9TVitN3api/item/readall")
  const allItems = await response.json()

  return {
    props: allItems
  }
}