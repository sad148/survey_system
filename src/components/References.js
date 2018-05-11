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
                        “Development of the Telehealth Usability Questionnaire (TUQ)”, <a
                            style={{color: "midnightblue", textDecoration: "underline"}}
                            href="https://telerehab.pitt.edu/ojs/index.php/Telerehab/article/view/6196">Int
                            J
                            Telerehabil, 8(1):3-10</a>. doi: 10.5195/ijt.2016.6196.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>MUQ publication:</label><br/>
                    <label style={{fontSize: "15px"}}>Submitted for publication</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Papers cited TUQ:</label><br/>
                    <label style={{fontSize: "15px"}}>Zhou L, Bao J, Parmanto B. (2017), “Systematic Review Protocol to
                        Assess the Effectiveness of Usability Questionnaires in mHealth App Studies”, <a
                            style={{color: "midnightblue", textDecoration: "underline"}}
                            href="http://www.researchprotocols.org/2017/8/e151/">JMIR Res Protoc, 6(8):e151</a>. doi:
                        10.2196/resprot.7826.</label><br/><br/>
                    <label style={{fontSize: "15px"}}>Serwe KM, Hersch GI, Pancheri K. (2017), “Feasibility of Using
                        Telehealth to Deliver the "Powerful Tools for Caregivers" Program”,<a
                            style={{color: "midnightblue", textDecoration: "underline"}}
                            href="http://telerehab.pitt.edu/ojs/index.php/Telerehab/article/view/6214">Int J
                            Telerehabil, 9(1):15-22</a>. doi: 10.5195/ijt.2017.6214.</label>
                </div>
            </div>
        </div>
    )
}

export default References;