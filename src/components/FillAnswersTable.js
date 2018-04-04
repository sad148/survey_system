import React from 'react'

const FillAnswersTable = (props) => {
    return (
        <div className={"tableDivBlock"}>
            <label className={"fontColor"}>Instructions: Please rate these questions on the provided scale. One
                being the lowest and seven the highest.</label>
            <table style={{borderCollapse: "separate"}} cellPadding={10}>
                <thead>
                <tr>
                    <th className={"fontColor"} style={{textAlign: "left"}}>Question</th>
                    <th className={"fontColor"} style={{textAlign: "right"}}>Answer</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.props.map(item => {
                        return (
                            <tr style={{
                                padding: "10px",
                                backgroundColor: "#d3d3d380"
                            }}>
                                <td width="50%" className={"fontColor questionTD"}
                                    style={{border: "0px"}}>{item.question}</td>
                                <td className={"answerTD"}
                                    style={{border: "0px", textAlign: "right"}}>{item.answer}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default FillAnswersTable;