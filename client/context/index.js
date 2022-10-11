import { useReducer, createContext, useEffect } from 'react';

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
    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user"))
        })

    }, [])

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )

}

export { Context, Provider }