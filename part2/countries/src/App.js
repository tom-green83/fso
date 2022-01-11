import axios from 'axios'
import React, { useState, useEffect } from 'react'

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
    </>
  )
}

const Results = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  } else if (countries.length == 1){
    return (
      <CountryInfo country={countries[0]} />
    )
  } else {
    return (
      countries.map(country => 
        <CountryName country={country} key={country.name.common}/>
      )
    )
  }  
}

const CountryName = ({ country }) => {
  return (
    <div>
      {country.name.common}
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
      <Results countries={filterCountries()} />
    </>
  )
}

export default App