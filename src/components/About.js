import React from 'react'

const About = () => {
    return (
        <div style={{height: "100%", display: "flex", padding: "50px"}}>
            <div style={{height: "100%", width: "30%"}}>
                <label style={{fontSize: "50px", fontWeight: "bold"}}>About</label>
            </div>
            <div style={{height: "100%", width: "70%"}}>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Purpose</label><br/>
                    <label style={{fontSize: "15px"}}>Lorem ipsum dolor sit amet, Sed eu nibh quis dolor fermentum
                        dapibus sit amet
                        vel risus.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Types of Questionnaires</label><br/>
                    <label style={{fontSize: "15px"}}>Lorem ipsum dolor sit amet, Sed eu nibh quis dolor fermentum
                        dapibus sit amet
                        vel risus.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Licensing</label><br/>
                    <label style={{fontSize: "15px"}}>Lorem ipsum dolor sit amet, Sed eu nibh quis dolor fermentum
                        dapibus sit amet
                        vel risus.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Contact Information</label><br/>
                    <label style={{fontSize: "15px"}}>Lorem ipsum dolor sit amet, Sed eu nibh quis dolor fermentum
                        dapibus sit amet
                        vel risus.</label>
                </div>
            </div>
        </div>
    )
}

export default About;