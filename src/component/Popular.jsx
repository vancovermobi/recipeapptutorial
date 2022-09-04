import { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from "./Card/Card"

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
    const check = localStorage.getItem('popular')

    if(check){
      setPopular(JSON.parse(check))
    }else{
      try {
        
      } catch (error) {
        
      }finally{

      }
    }
   
    //const data = await api.json()
    //console.log("data", data);
}

  return (
    <div className="WrapperPopular" >
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: ".5rem",
          rewind : true,
        }}
      >
        {
          popular.map((recipe) => {
            return(
              <SplideSlide>
                <Card recipe={recipe}/>
              </SplideSlide>
            )
          })
        }
      </Splide>
    </div>
  )
}

export default Popular