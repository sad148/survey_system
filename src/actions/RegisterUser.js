var request = require('superagent');

export default function registerUser(data) {
    return function (dispatch) {
        //let apiUrl = sessionStorage.getItem('apiurl');
        let apiUrl = 'http://localhost:3009/'
        console.log("inside registeruser api")
        request
            .post(apiUrl + 'registerUser')
            .set('Content-Type', 'application/json')
            .send({data:data})
            .end((err,res) => {
                if(err) {
                    console.log("Error",err);
                }
                else {
                    if(res.body.code == 200)
                        dispatch({type:"REGISTER_USER_SUCCESS"})
                    else
                        dispatch({type:"DISPLAY_ERROR", message:res.body.message})
                }
            })
    }
}