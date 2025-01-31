import * as React from 'react'

import './App.css'

function App() {
  const [term, setTerm] = React.useState('')
  return (
    <>
      <h1>REST Countries</h1>
      <InputWithLabelAndButton id="search" typ="text" value={term} >
        Search Country:
      </InputWithLabelAndButton>
    </>
  )
}


function InputWithLabelAndButton({id,type,value,children}){
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
      <input type={type} id={id} ref={inputRef} value={value} />
      <button>Search</button>
    </>
  )
}

export default App
