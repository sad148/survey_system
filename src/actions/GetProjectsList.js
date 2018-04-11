var request = require('superagent');

export default function getprojectslist(userid) {
    return function (dispatch) {
        let apiUrl = sessionStorage.getItem("apiurl");
        request
            .post(apiUrl + 'getprojectslist')
            .set('Content-Type', 'application/json')
            .send({userid: userid})
            .end((err, res) => {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    if (res.body.code == 200) {
                        dispatch({type: "PROJECT_DATA", payload: res.body.data});
                    }
                    else {
                        alert("Error in getting list of projects")
                    }
                }
            })
    }
}