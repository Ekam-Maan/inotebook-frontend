import React, {useState } from 'react'
import alertContext from './alertContext'

const AlertState = (props) => {
    const [alert, setAlert] = useState({message: "", type: ""});

    const showAlert = (msg, type) =>{
        setAlert({message: msg, type: type });
        setTimeout(()=>{
            setAlert({message: "", type: ""});
        }, 2500)
    }

  return (
    <alertContext.Provider value={{alert, showAlert}}>
      {props.children}
    </alertContext.Provider>
  )
}

export default AlertState;
