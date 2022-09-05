import { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from "./Card/Card"
import apiRequest from "../apiRequest/apiRequest";

function Veggie() {
  const [veggie, setVeggie] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  //Url API Spoonacular
const urlOnline = "https://api.spoonacular.com/recipes/random"
const apiKey = process.env.REACT_APP__FOOD_API_KEY
const numberPages = 20
const tags = 'vegetarian'
const urlApiOnline = `${urlOnline}?apiKey=${apiKey}&number=${numberPages}&tags=${tags}`

  // Url local db.json
const urlLocal = `http://localhost:3500/recipes/?_start=0&_end=10`

useEffect(() =>{
    getVeggie()
}, [])

const getVeggie = async () =>{
    const check = localStorage.getItem('veggie')

    if(check){
      setVeggie(JSON.parse(check))
      setIsLoading(false)
    }else{
      try {
        const resultOnline = await apiRequest(urlApiOnline)
        if(resultOnline.dataResponse){
          //console.log("Spoonacular: ", resultOnline.dataResponse.recipes);
          setVeggie(resultOnline.dataResponse.recipes) 
          localStorage.setItem('veggie', JSON.stringify(resultOnline.dataResponse.recipes))         
        }else{
          const resultLocal = await apiRequest(urlLocal)
          if(resultLocal.dataResponse){
            setVeggie(resultLocal.dataResponse)
            localStorage.setItem('veggie', JSON.stringify(resultLocal.dataResponse))
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
      <h3>Our Vegetarian Picks</h3>
      {isLoading && <p>Loading items recipes...</p>}
      {
        fetchError && <p style={{ color: "red"}} >{`Error: ${fetchError}`}</p>
      }
      {!fetchError && !isLoading &&
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: ".5rem",
            rewind : true,
          }}
        >
          {
            veggie.map((recipe) => {
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

export default Veggie