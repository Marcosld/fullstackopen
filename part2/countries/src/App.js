import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Filter = ({collection, onFilter, children}) => {
    const [value, setValue] = useState('')

    const handleChange = e => {
        setValue(e.target.value)
        onFilter(collection.filter(({name}) => name.toUpperCase().includes(e.target.value.toUpperCase())))
    }

    return (
        <div>
            {children} <input value={value} onChange={handleChange} />
        </div>
    )
}

const CountryDetails = ({country: {name, capital, population, languages, flag}}) => (
    <>
        <h2>{name}</h2>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <h3>languages</h3>
        <ul>
            {languages && languages.map(({name, iso639_1}) => <li key={iso639_1}>{name}</li>)}
        </ul>
        <img src={flag} width={200} height={200}/>
    </>
)

const Country = ({country}) => {
    const [detail, setDetail] = useState(false)

    return detail ?
        <CountryDetails country={country} /> :
        <>
            <p>{country.name}</p>
            <button onClick={() => setDetail(true)}>show</button>
        </>
}

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (countries.length > 1) {
        return countries.map(country => <Country key={country.alpha2Code} country={country} />)
    }
    if (countries.length === 1) {
        return <CountryDetails country={countries[0]}/>
    }
    return null;
}

const App = () => {
    const [ countries, setCountries] = useState([])
    const [ filteredCountries, setFilteredCountries ] = useState([])

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }, [])

    return (
        <div>
            <Filter collection={countries} onFilter={setFilteredCountries}>Find countries</Filter>
            <Countries countries={filteredCountries} />
        </div>
    )
}

export default App
