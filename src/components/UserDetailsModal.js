import React from 'react'
import {Modal} from 'antd';

const UserDetailsModal = (props) => {
    let functionCall = props.onCancel
    props = props.props
    return (
        <Modal
            title={"User Details"}
            footer={null}
            visible={true}
            onCancel={functionCall}
        >
            <div>
                <div style={{marginBottom: "10px"}}>
                    <label className={"fontColor"}>Name - </label>
                    <label className={"fontColor"}
                    >{`${props.first_name} ${props.last_name}`}</label>
                </div>
                <div style={{marginBottom: "10px"}}>
                    <label className={"fontColor"}>Email - </label>
                    <label className={"fontColor"}>{`${props.email}`}</label>
                </div>
                <div style={{marginBottom: "10px"}}>
                    <label className={"fontColor"}>Contact Number - </label>
                    <label className={"fontColor"}>{`${props.contact_number}`}</label>
                </div>
                <div style={{marginBottom: "10px"}}>
                    <label className={"fontColor"}>Address - </label>
                    <label className={"fontColor"}
                    >{`${props.address} \n ${props.country}`}</label>
                </div>
                <div style={{marginBottom: "10px"}}>
                    <label className={"fontColor"}>Organization - </label>
                    <label className={"fontColor"}>{`${props.organization}`}</label>
                </div>
            </div>
        </Modal>
    )
}

export default UserDetailsModal;