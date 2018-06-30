const errors = (state = { display:"" , message:""}, action) => {
    switch (action.type) {
        case "DISPLAY_ERROR":
            state = {
                ...state,
                display:true,
                message:action.message
            }
            break;
        case "RESET_ERROR":
            state ={
                ...state,
                display:"",
                message:""
            }
            break;
    }
    return state;
}

export default errors;