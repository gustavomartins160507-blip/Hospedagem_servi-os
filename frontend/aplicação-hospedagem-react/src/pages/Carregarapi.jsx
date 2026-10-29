import { useEffect,useState  } from "react"
import "../app.css"
const LoadApi = () =>{

    const [Data, SetData] = useState(null)
    useEffect(() =>{

    async function loadData(){
      
      const Data =  await fetch("http://localhost:3000/").then(res => res.json())
      SetData(Data)
      
    }
    loadData()

    }, [])

    return (
      <>
       {Data?.map(post => {
        return (
          
          <div key={post.id}>
          <p>{post.titulo}</p>
          <p>{post.nome}</p>
          <p>{post.autor}</p>

      </div>
        )
       })}
      </>
    )

}

export default LoadApi;