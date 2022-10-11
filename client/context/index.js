import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'

//initial state
const initialState = {
    user: null,
};

//createContext
const Context = createContext()

// root reducer : used to update the state and to acess data from the state
// action contient Type et payload : payload constient user informations
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state;
    }
}

//context provider
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    const router = useRouter();
    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user"))
        })

    }, [])

    axios.interceptors.response.use(
        (response) => {
            //any status code tha lie within the range of 2XX cause this function to trigger 
            return response

        }, (error) => {
            //any status code that falls outside the range of 2XX cause this function to trigger 
            let res = error.response;
            if (res.state === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.get('/api/logout')
                        .then((data) => {
                            console.log('/401 error > logout')
                            dispatch({ type: 'LOGOUT' })
                            window.localStorage.removeItem("user")
                            router.push('/login')
                        })
                        .catch(err => {
                            console.log("AXIOS INTERSPECTORS ERR", err)
                            reject(error);
                        })
                })

            }

            return Promise.reject(error)
        })

    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get('/api/csrf-token')
            console.log('CSRF', data)
            axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
        };
        getCsrfToken()
    }, [])


    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )

}

export { Context, Provider }