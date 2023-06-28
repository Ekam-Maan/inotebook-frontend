import React from 'react'

const Alerts = (props) => {
    const{message, type} = props.alert;
    return (
        <div style={{height: '50px'}}>
            <div class={`alert alert-${type} alert-dismissible fade show`} role="alert">
                {message}
            </div>
        </div>
    )
}

export default Alerts
