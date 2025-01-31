import * as React from 'react'

import './App.css'

function App() {
  return (
    <>
      <h1>REST Countries</h1>
      <InputWithLabelAndButton id="search" typ="text" >
        Search Country:
      </InputWithLabelAndButton>
    </>
  )
}


function InputWithLabelAndButton({id,type,children}){
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
      <input type={type} id={id} ref={inputRef} />
      <button>Search</button>
    </>
  )
}

export default App
