var request = require('superagent');

export default function login(data) {
    return function (dispatch) {
        let apiUrl = 'http://localhost:3009/'
        request
            .post(apiUrl + 'login')
            .set('Content-Type', 'application/json')
            .send({data: data})
            .end((err, res) => {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    if (res.body.code == 200) {
                        sessionStorage.setItem("userid", res.body.data.user_id);
                        sessionStorage.setItem("apiUrl", 'http://localhost:3009/');
                        dispatch({type: "LOGIN_SUCCESS", data: res.body.data})
                    }
                    else
                        dispatch({type: "DISPLAY_ERROR", message: res.body.message})
                }
            })
    }
}