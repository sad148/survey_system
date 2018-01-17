var request = require('superagent');

export default function createProject(data) {
    return function (dispatch) {
        //let apiUrl = sessionStorage.getItem('apiurl');
        let apiUrl = 'http://localhost:3009/createproject'
        request
            .post(apiUrl + 'createProject')
            .set('Content-Type', 'application/json')
            .send({data:data})
            .end((err,res) => {
                if(err) {
                    console.log("Error",err);
                }
                else {
                    if(res.body.code == 200)
                        dispatch({type:"PROJECT_CREATE_SUCCESS"})
                    else
                        dispatch({type:"DISPLAY_ERROR", message:res.body.message})
                }
            })
    }
}