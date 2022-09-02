import { useEffect } from "react"

function Popular() {
const urlApi = "https://api.spoonacular.com/recipes/random"
const apiKey = process.env.REACT_APP__FOOT_API_KEY
const numberPages = 10

useEffect(() =>{
    getPopular()
}, [])

const getPopular = async () =>{
    const api = await fetch(
       `${urlApi}?apiKey=${apiKey}&number=${numberPages}`
       //`https://api.spoonacular.com/recipes/random?apiKey=fe406a9023774e89b6448ea11c5b97b5&number=9`
       )
    const data = await api.json()
    console.log("data", data);
}

  return (
    <div>Popular</div>
  )
}

export default Popular