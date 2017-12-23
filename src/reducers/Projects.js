const projects = (state = { projectData:"" , projectDataReceived:""}, action) => {
    switch (action.type) {
        case "PROJECT_DATA":
            console.log("-------------",action);
            state = {
                ...state,
                projectData:action.payload,
                projectDataReceived:true
            }
            break;
        case "RESET_PROJECT":
            state ={
                ...state,
                projectData:"",
                projectDataReceived:""
            }
            break;
    }
    console.log(state);
    return state;
}

export default projects;