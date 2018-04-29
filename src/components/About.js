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
                    <label style={{fontSize: "15px"}}>The purpose of this site is to provide brief information about
                        these two usability questionnaires and one usability study site (link to the site) you may use
                        in your study, in which you can create your usability study questionnaire and administer your
                        usability study. The responses from study participants will be available for download and
                        further analysis.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Types of Questionnaires</label><br/>
                    <label style={{fontSize: "15px"}}>The Telehealth Usability Questionnaire (TUQ) was developed to
                        evaluate the usability of telehealth implementation and services. The Mobile Health (mHealth)
                        App Usability Questionnaire (MAUQ) was created to assess the usability of mHealth apps created
                        for patients and providers. These two usability questionnaires were created by a team of
                        researchers in the Health And Rehabilitation Informatics (HARI) Lab in the Department of Health
                        Information Management at the University of Pittsburgh. The reliability and validity of these
                        two questionnaires have been evaluated with human subjects.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Licensing</label><br/>
                    <label style={{fontSize: "15px"}}>There is no license fee for using these two usability
                        questionnaires. You also do not need to request a permission from us before you use these
                        questionnaires. If you use either of these two questionnaires in your study, you are encouraged
                        but not required to cite the corresponding paper. If you notify us after your paper is
                        published, we will be happy to post your paper in the <a
                            style={{color: "midnightblue", textDecoration: "underline"}}
                            href="/survey_system/references">References</a> section on this site.</label>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold"}}>Contact Information</label><br/>
                    <label style={{fontSize: "15px"}}>Bambang Parmanto, PhD<br/>
                        412-383-6649<br/>
                        parmanto@pitt.edu<br/>
                        <br/>
                        Leming Zhou, PhD<br/>
                        412-383-6653<br/>
                        Leming.Zhou@pitt.edu</label>
                </div>
            </div>
        </div>
    )
}

export default About;