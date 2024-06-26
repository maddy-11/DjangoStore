import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { closeAlert } from "../reducer/Actions";

const Alert = (props) => {
    const [classAlert, setClassAlert] = useState("alert ms-auto bg-warning");
    const handleClose = () => {
        setClassAlert("alert d-none");
        props.closeAlert();
    };
    return (
        <div className={classAlert}>
            <div className="d-flex">
                <div className="toast-body">{props.message}</div>
                <div className="button btn-close m-auto me-2" type="button" onClick={handleClose}></div>
            </div>
        </div>
    );
};

export default connect(null, { closeAlert })(Alert);