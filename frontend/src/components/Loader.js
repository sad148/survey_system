import React from 'react';
import {Spin, Icon} from 'antd'

const Loader = () => {
    return (
        <div style={{width: "100%", position: "absolute", top: "50%", textAlign: "center"}}>
            <Icon type="loading" style={{fontSize: 90}} spin/>
        </div>
    )
}

export default Loader;