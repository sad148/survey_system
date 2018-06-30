const registerUser = (state = { userRegistered:"", data:"", message:"" }, action) => {
    switch (action.type) {
        case 'REGISTER_USER_SUCCESS':
            console.log("asdasd");
            state = {
                ...state,
                userRegistered:true,
                data:action.payload
            }
            break;
        case 'REGISTER_USER_ERROR':
            state = {
                ...state,
                message:action.message,
                userRegistered:false
            }
            break;
        case 'RESET_REGISTER_USER':
            state= {
                ...state,
                userRegistered:"",
                data:"",
                message:""
            }
    }
    return state;
}

export default registerUser;