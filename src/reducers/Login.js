const login = (state = {data: "", message: "", loginSuccess: "", admin: false}, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            state = {
                ...state,
                loginSuccess: true,
                data: action.data
            }
            break;
        case 'LOGIN_ERROR':
            state = {
                ...state,
                message: action.message,
                loginSuccess: false
            }
            break;
        case 'RESET_LOGIN':
            state = {
                ...state,
                loginSuccess: "",
                data: "",
                message: ""
            }
            break;
    }
    return state;
}

export default login;