var request = require('superagent');

export default function getprojectslist(userid) {
    return function (dispatch) {
        console.log("userid", userid);
        //let apiUrl = sessionStorage.getItem('apiurl');
        let apiUrl = 'http://localhost:3009/'
        request
            .post(apiUrl + 'getprojectslist')
            .set('Content-Type', 'application/json')
            .send({userid:userid})
            .end((err,res) => {
                if(err) {
                    console.log("Error",err);
                }
                else {
                    if(res.body.code == 200) {
                        dispatch({type:"PROJECT_DATA", payload:res.body.data});
                    }
                    else
                        dispatch({type:"DISPLAY_ERROR", message:res.body.message})
                }
            })
    }
}