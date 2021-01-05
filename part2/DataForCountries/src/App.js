import React, { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filtName, setFiltName] = useState('')
  const [ weather, setWeather] = useState()
  
  const handlefiltNameChange = (event) => {
    setFiltName(event.target.value)
  }

  useEffect(() => {
    axios
    .get(`https://restcountries.eu/rest/v2/all`)
    .then(response => {
      setCountries(response.data)
    })
  }, []);

  useEffect(() => {
    if (countryToShow.length === 1) {
      const api_key = process.env.REACT_APP_API_KEY
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryToShow[0].capital}`)
        .then(response => {
          //console.log(response.data.current)
          setWeather(response.data)
        })
    }
  });


  const countryToShow = countries.filter(person => person.name.toLowerCase().indexOf(filtName.toLowerCase()) !== -1)
  if (countryToShow.length > 10) {
    return(
        <div>
        <p>find countries <input value={filtName} onChange={handlefiltNameChange}/></p>
        <ul>
        Too many matchs, specify another filter
        </ul>
      </div>
    )
  } else if (countryToShow.length === 1) {
        return (
          <div>
          <p>find countries <input value={filtName} onChange={handlefiltNameChange}/></p>
          <h1>
            {countryToShow[0].name}
          </h1>
          <p>capital {countryToShow[0].capital}</p>
          <p>pupulation {countryToShow[0].population}</p>
          <h2>
            languages
          </h2>
          <ul>
            {countryToShow[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <p ><img src={countryToShow[0].flag} style={{width:'110px'}} alt=""/></p>
          <h1>Weather in Helsinki</h1>
          <p><b>temperature:</b>{weather.current.temperature} Clecius</p>
          <img src={weather.current.weather_icons} style={{width:'100px'}} alt=""/>
          <p><b>wind:</b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
        )
  } else if (countryToShow.length > 1 && countryToShow.length <= 10) {
    return (
      <div>
        <p>find countries <input value={filtName} onChange={handlefiltNameChange}/></p>
        <ul>
        {countryToShow.map(country => 
          <li key={country.numericCode}>
            {country.name} 
            <button onClick={() => setFiltName(country.name)}>show</button>
          </li>

        )}
        </ul>
    </div>
    )
  } else {
    return (
      <div>
        <p>find countries <input value={filtName} onChange={handlefiltNameChange}/></p>
      </div>
    )
  }
}

export default App