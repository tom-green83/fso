import axios from 'axios'
import React, { useState, useEffect } from 'react'

const CapitalWeather = ({ capital }) => {
  const [weather, setWeather] = useState({})
  const apiKey = process.env.REACT_APP_API_KEY
  const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
  useEffect(() => {
    axios.
    get(apiURL).
    then(response => {
      setWeather(response.data)
    })
  }, [])
  
  if (Object.keys(weather).length){
    const iconURL =`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      return (
        <div>
          <h2>Weather in {capital}</h2>
          <strong>temperature: </strong>{Math.round(weather.main.temp)} Celsius
          <div>
            <img src={iconURL} alt={"image of " + weather.weather[0].description}/>
          </div>
          <strong>wind: </strong> {weather.wind.speed} metres per second, {weather.wind.deg} degrees
          
        </div>   
      )}
  else {
    return (
    <div>
      Weather API unavailable
    </div>
    )
  }  
}

const CountryInfo = ({ country }) => {

  // Function to render languages for a country
  const Languages = (languages) => {
      return (
        <ul>
          {Object.values(languages).map(language => {
            return (
              <li key={language}>
                {language}
              </li>
            )
          })}
        </ul>
      )
    }

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spoken languages</h2>
      {Languages(country.languages)}
      <img src={country.flags.png} alt={"Flag of " + country.name.common} />
      <CapitalWeather capital={country.capital} />
    </>
  )
}

const Results = ({ countries, handleFilterChange}) => {
  if (countries.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  } else if (countries.length === 1){
    return (
      <CountryInfo country={countries[0]} />
    )
  } else {
    return (
      countries.map(country => 
        <CountryName country={country} key={country.name.common} handleFilterChange={handleFilterChange}/>
      )
    )
  }  
}

const CountryName = ({ country, handleFilterChange }) => {
  return (
    <div>
      {country.name.common}
      <button value={country.name.common} onClick={handleFilterChange}>Show</button>
    </div>
  )
}

const SearchBox = ({ handleFilterChange }) => {
  return (
    <>
        find countries <input onChange={handleFilterChange}/>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  // Get data from server
  useEffect(() => {
    axios.
    get('https://restcountries.com/v3.1/all').
    then(response => {
      setCountries(response.data)
    })
  }, [])

  // Event handlers
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterCountries = () => {
    if (filter) {
      return (countries.filter(country => country.name.common.toUpperCase().includes(filter.toLocaleUpperCase())))
    } else {
      return []
    }
  }

  return (
    <>
      <SearchBox handleFilterChange={handleFilterChange} />
      <Results countries={filterCountries()} handleFilterChange={handleFilterChange} />
    </>
  )
}

export default App