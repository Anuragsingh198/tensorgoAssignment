import React,  {createContext , useContext , useReducer , useEffect} from 'react'

import { reducer } from './reducer';


const  initialState = {
    currentUser : null,
    isLogin : false,
    Loading : false,
    alert:{open:false , severity:'info' , message:''},
    profile:{open:false , file :null ,  photoUrl:''},
    details:{category:'' ,title:'' , description:''},
}   

const  Context = createContext(initialState);

 export const  useValue = () =>{
    return  useContext(Context);
}

const ContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(reducer , initialState)
    useEffect(() =>{
      const  currentUser = JSON.parse(localStorage.getItem('currentUser')); 
      if(currentUser){
        dispatch({type:'UPDATE_USER' , payload:currentUser })
      }
    }, [])
  return (
    <Context.Provider value={{state , dispatch}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider