const demographicQuestion = (state = { data:"", renderFlag:false }, action) => {
    switch (action.type) {
        case "ADD_NEW_DEMOGRAPHIC_QUESTION":
            state = {
                ...state,
                data:action.payload,
                renderFlag:true
            }
            break;
        case "RESET_DEMOGRAPHIC_QUESTION":
            state = {
                ...state,
                renderFlag:false,
                data:""
            }
            break;
    }
    return state;
}

export default demographicQuestion;