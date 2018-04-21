import React from 'react'

const References = () => {
    return (
        <div style={{height: "100%", display: "flex", padding: "50px"}}>
            <div style={{height: "100%", width: "30%"}}>
                <label style={{fontSize: "50px", fontWeight: "bold"}}>References</label>
            </div>
            <div style={{height: "100%", width: "70%"}}>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>TUQ publication:</label><br/>
                    <label style={{fontSize: "15px"}}>Parmanto B, Lewis AN Jr, Graham KM, Bertolet MH. (2016),
                        “Development of the
                        Telehealth Usability Questionnaire (TUQ)”, Int J Telerehabil, 8(1):3-10. doi: 10.5195/ijt.
                        2016.6196.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>MAUQ publication:</label><br/>
                    <label style={{fontSize: "15px"}}>Lorem ipsum dolor sit amet, Sed eu nibh quis dolor fermentum
                        dapibus sit amet
                        vel risus.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Papers cited TUQ:</label><br/>
                    <label style={{fontSize: "15px"}}>Zhou L, Bao J, Parmanto B. (2017), “Systematic Review Protocol to
                        Assess the Effectiveness
                        of Usability Questionnaires in mHealth App Studies”, JMIR Res Protoc,
                        6(8):e151. doi: 10.2196/resprot.7826.</label>
                    <label style={{fontSize: "15px"}}>Serwe KM, Hersch GI, Pancheri K. (2017), “Feasibility of Using
                        Telehealth to Deliver
                        the "Powerful Tools for Caregivers" Program”, Int J Telerehabil, 9(1):15-22. doi:
                        10.5195/ijt.2017.6214.</label>
                </div>
            </div>
        </div>
    )
}

export default References;