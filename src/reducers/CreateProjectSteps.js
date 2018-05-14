const createProjectSteps = (state = {next: "", createProjectStepsData: {}}, action) => {
    console.log("inside reducer");
    switch (action.type) {
        case "NEXT":
            let key = Object.keys(action.payload);
            key = key[0]
            let value = action.payload[key];
            let stepData;
            if (key == "step1")
                state.createProjectStepsData["step1"] = value
            else if (key == "step2")
                state.createProjectStepsData["step2"] = value
            else if (key == "step3")
                state.createProjectStepsData["step3"] = value
            else if (key == "step4")
                state.createProjectStepsData["step4"] = value
            state = {
                ...state,
                next: true
            }
            break;
        case "PREVIOUS":
            state = {
                ...state,
                next: false
            }
            break;
        case 'RESET_CREATE_PROJECT_STEPS':
            state = {
                ...state,
                next: ""
            }
            break;
        case 'PROJECT_CREATED':
            state = {
                ...state,
                createProjectStepsData: {}
            }
            break;
    }
    return state;
}

export default createProjectSteps;