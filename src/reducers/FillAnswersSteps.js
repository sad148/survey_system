const fillAnswersSteps = (state = {next: "", fillAnswersStepsData: {}}, action) => {
    switch (action.type) {
        case "NEXT":
            let key = Object.keys(action.payload);
            key = key[0]
            let value = action.payload[key];
            let stepData;
            if (key == "step2")
                state.fillAnswersStepsData["step2"] = value
            else if (key == "step3")
                state.fillAnswersStepsData["step3"] = value
            else if (key == "step4")
                state.fillAnswersStepsData["step4"] = value
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
        case 'RESET_FILL_ANSWERS_STEPS':
            state = {
                ...state,
                next: ""
            }
            break;
    }
    return state;
}

export default fillAnswersSteps;