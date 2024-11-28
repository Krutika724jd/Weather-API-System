import React, { useEffect, useRef, useState } from 'react'


function WeatherApi() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  //so,now i am going to get current time and a date using usestate ad useeffect
  const [currentTime, setCurrentTime] = useState(new Date())

  const apiKey = '360b3b801bccce2a9ca2b58e73cae18f'

  const fetchData = async () => {
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      if (!response.ok) {
        throw new Error("City not found")
      }

      let data = await response.json()
      setWeather(data)
      console.log(data)
    } catch (error) {
      setError(error.message)
      console.error("Error in fetching weather data", error.message)
      setWeather(null)
    }

  }
  useEffect(() => {
    //we are going to make use of js date object
    //for this we will create a timerid so later we can 
    // clear this interval i.e timer id
    const time = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    //Also we are going to clear interval after component  unmount 
    return () =>
      clearInterval(time)

  }, [])






  const handleChange = (e) => {
    setCity(e.target.value)

  }
  return (
    <>
      <h1 className='text-center font-serif text-3xl font-semibold my-20 '>Weather API</h1>
      <div className='flex justify-center flex-col border-2 border-slate-950 mx-96 my-7  items-center h-auto bg-slate-400 rounded-md '>

        <div className='flex flex-col justify-center '>

          <div className='flex  justify-center items-center gap-3 font-serif my-4   h-76'>
            <input type="search" value={city} placeholder='Enter a city' className='border-2 border-slate-400 text-xl pl-2 text-gray-950' onChange={handleChange} />
            <button onClick={fetchData} className='bg-yellow-500 py-1 px-8 rounded-xl hover:bg-amber-300 shadow-md shadow-slate-500 hover:shadow-none'>Search</button>
          </div>
          {error &&
            <p className='text-center text-2xl font-serif text-red-600'>{error}</p>}

          {weather ? (
            <>
              <div className='flex flex-col  justify-center items-center gap-3 font-serif my-3 font-bold border-2 shadow-black bg-white p-4'>
                <h1>Current time & Date:{currentTime.toLocaleDateString()} </h1>
                {/* {currentTime.toLocaleTimeString()} */}
                {/* It will get time dand date into the original format that we see everyday */}
                <h1 >Getting Weather Data:{weather.name}, {weather.sys?.country}</h1>
                <h2>{weather.main?.temp}°C </h2>
                <h1>Feels like {weather.main?.feels_like}°C.{weather.weather[0]?.main}</h1>
                <ul>
                  <li>visibility: {weather.visibility} meters</li>
                  <li>speed:{weather.wind?.speed} m.s</li>
                </ul>
              </div>
            </>
          ) : (
            <p className='text-center'>Enter a City to see the Weather</p>
          )

          }
        </div>
      </div>
    </>
  )
}

export default WeatherApi