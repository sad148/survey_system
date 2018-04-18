import React from 'react'

const FillAnswersTable = (props) => {
    return (
        <div className={"tableDivBlock1"}>
            <label className={"fontColor"}>{props.instructions}</label>
            <table style={{borderCollapse: "separate"}} cellPadding={10}>
                <thead>
                <tr>
                    <th></th>
                    <th></th>
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
                                <td width={props.width || "60%"} className={"fontColor questionTD"}
                                    style={{border: "0px", verticalAlign: "inherit"}}>{item.question}</td>
                                <td className={"answerTD"}
                                    style={{border: "0px", textAlign: props.align || "right"}}>{item.answer}</td>
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