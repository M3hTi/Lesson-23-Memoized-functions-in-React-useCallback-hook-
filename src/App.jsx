import * as React from 'react'

import './App.css'



function reducer(state, action){
  switch (action.type) {
    case 'LOADING':
      return {data: [], isLoading: true, isError: false}
    case 'LOADED':
      return {data: action.payload, isLoading: false, isError: false}
    case 'ERROR':
      return {data: [], isLoading: false, isError: action.payload}
    default:
      return state
  }
}







function App() {
  const [term, setTerm] = React.useState('')

  const  initialState = {
    data: [],
    isLoading: false,
    isError: false
  }

  const [info, dispatchInfo] = React.useReducer(reducer,initialState)

  const handlerInput = React.useCallback((e) =>  {
      const newValue = e.target.value 
      setTerm(newValue)
  },[term])


  const fetchData  = React.useCallback(() => {
      if(!term) {
        dispatchInfo({type: 'LOADING'})
        return
      };
      dispatchInfo({type: 'LOADING'})
      fetch(`https://restcountries.com/v3.1/name/${term}`)
        .then(res => {
          if(!res.ok) throw new Error(`Error`);
          return res.json()
        })
        .then(data => 
          dispatchInfo({type: 'LOADED', payload: data})
        )
        .catch(error => dispatchInfo({type: 'ERROR', payload: error.message}))
  },[term])


  React.useEffect(() => {
    fetchData()
  }, [fetchData])



  return (
    <div className="container">
      <h1>REST Countries</h1>
      <div className="search-container">
        <InputWithLabelAndButton id="search" typ="text" value={term} onHandler={handlerInput}>
          Search Country:
        </InputWithLabelAndButton>
      </div>
      {info.isError && <p>{info.isError}</p>}
      {info.isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <List items={info.data} />
      )}
    </div>
  )
}


function InputWithLabelAndButton({id,type,value,onHandler, children}){
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus()
    }
  },[inputRef])


  return(
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input type={type} id={id} ref={inputRef} value={value} onInput={onHandler} />
      <button>Search</button>
    </>
  )
}


function List({ items }) {
  if (!items || items.length === 0) {
    return <p>No countries found</p>;
  }

  return (
    <div className="countries-grid">
      {items.map((item) => (
        <div className="country-card" key={item.name.common}>
          <h3>{item.name.common} {item.flag}</h3>
          <p>Capital: {item.capital?.[0]}</p>
          <p>Continents: {item.continents?.join(", ")}</p>
          <p>Currencies: {item.currencies && Object.keys(item.currencies).join(", ")}</p>
          <p>Population: {item.population?.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App
