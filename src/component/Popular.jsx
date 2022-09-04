import { useEffect, useState } from "react"

function Popular() {
  const [popular, setPopular] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  //Url API Spoonacular
const urlOnline = "https://api.spoonacular.com/recipes/random"
const apiKey = process.env.REACT_APP__FOOT_API_KEY
const numberPages = 10
const urlApiOnline = `${urlOnline}?apiKey=${apiKey}&number=${numberPages}`

  // Url local db.json
const urlLocal = `http://localhost:3500/recipes/?_start=0&_end=10`

useEffect(() =>{
    getPopular()
}, [])

const getPopular = async () =>{
   
    //const data = await api.json()
    //console.log("data", data);
}

  return (
    <div>Popular</div>
  )
}

export default Popular