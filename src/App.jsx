import * as React from 'react'

import './App.css'

function App() {
  const [term, setTerm] = React.useState('')

  const handlerInput = React.useCallback((e) =>  {
      const newValue = e.target.value 
      setTerm(newValue)
  },[term])



  return (
    <>
      <h1>REST Countries</h1>
      <InputWithLabelAndButton id="search" typ="text" value={term} onHandler={handlerInput} >
        Search Country:
      </InputWithLabelAndButton>
    </>
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

export default App
