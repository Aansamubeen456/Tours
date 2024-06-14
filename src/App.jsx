import { useEffect, useState } from 'react'
import Tours from './Tours'
import Loading from './Loadings'
// import Loading from './Loadings'

const url = 'https://www.course-api.com/react-tours-project'

const App = () => {
  const [tours, setTours] = useState([])
  const [isError, setisError] = useState(false)
  const [isLoading, setisLoading] = useState(true)

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fecthTours = async () => {
    setisLoading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        setisError(true)
        setisLoading(false)
        return
      }
      const tours = await response.json()
      setisLoading(false)
      setTours(tours)
      // console.log(tours)
    } catch (error) {
      setisLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fecthTours()
  }, [])
  if (isError) {
    return <h2>there is an error</h2>
  }
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" type="button" onClick={fecthTours}>
            refresh
          </button>
        </div>
      </main>
    )
  }

  return <main>{<Tours tours={tours} removeTour={removeTour} />}</main>
}
export default App
