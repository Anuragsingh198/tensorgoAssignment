export const reducer = (state, action) => {
    switch (action.type) {
      case "OPEN_LOGIN":
        return{...state , isLogin:true}
      case "CLOSE_LOGIN":
        return {...state , isLogin:false}
      case 'UPDATE_ALERT':
        return { ...state,  alert: action.payload };
      case 'UPDATE_PROFILE':
        return { ...state,  profile: action.payload };
      case 'UPDATE_USER':
        localStorage.setItem('currentUser' , JSON.stringify(action.payload))
        return { ...state, currentUser: action.payload }; 
      case "UPDATE_DETAILS":
        return {...state , details :{...state.details , ...action.payload}}       
      case 'LOADING_START':
        return { ...state, Loading:  true };
      case 'LOADING_END': 
        return { ...state, Loading:  false };
      default:
        throw new Error('No matching action type');
    }
  };
  