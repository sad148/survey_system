const createProjectSteps = (state = { next:"", createProjectStepsData:[]}, action) => {
    switch (action.type) {
        case "NEXT":
            let key = Object.keys(action.payload);
            key = key[0]
            let value = action.payload[key];
            let stepData;
            if(key == "step1")
                state.createProjectStepsData[0] = value
            else if(key == "step2")
                state.createProjectStepsData[1] = value
            else
                state.createProjectStepsData[2] = value

            state = {
                ...state,
                next:true
            }
            break;
        case "PREVIOUS":
            state = {
                ...state,
                next:false
            }
            break;
        case 'RESET_CREATE_PROJECT_STEPS':
            state = {
                ...state,
                next:"",
                createProjectStepsData:""
            }
            break;
    }
    return state;
}

export default createProjectSteps;