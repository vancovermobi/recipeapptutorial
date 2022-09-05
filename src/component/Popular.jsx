import { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from "./Card/Card"
import apiRequest from "../apiRequest/apiRequest";

function Popular() {
  const [popular, setPopular] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  //Url API Spoonacular
const urlOnline = "https://api.spoonacular.com/recipes/random"
const apiKey = process.env.REACT_APP__FOOD_API_KEY
const numberPages = 20
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
      setIsLoading(false)
    }else{
      try {
        const resultOnline = await apiRequest(urlApiOnline)
        if(resultOnline.dataResponse){
          //console.log("Spoonacular: ", resultOnline.dataResponse.recipes);
          setPopular(resultOnline.dataResponse.recipes) 
          localStorage.setItem('popular', JSON.stringify(resultOnline.dataResponse.recipes))         
        }else{
          const resultLocal = await apiRequest(urlLocal)
          if(resultLocal.dataResponse){
            setPopular(resultLocal.dataResponse)
            localStorage.setItem('popular', JSON.stringify(resultLocal.dataResponse))
            //console.log("Data Local: ", resultLocal.dataResponse);
          }
        }
        setFetchError(null)        
      } catch (error) {
        setFetchError(error.message)
      }finally{
        setIsLoading(false)
      }
    }   
}

  return (
    <div className="WrapperPopular" >
      <h3>Popular Picks</h3>
      {isLoading && <p>Loading items recipes...</p>}
      {
        fetchError && <p style={{ color: "red"}} >{`Error: ${fetchError}`}</p>
      }
      {!fetchError && !isLoading &&
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
                <SplideSlide key={recipe.id}>
                  <Card recipe={recipe}/>
                </SplideSlide>
              )
            })
          }
        </Splide>
      }
    </div>
  )
}

export default Popular