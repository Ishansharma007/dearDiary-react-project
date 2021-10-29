import { useContext } from "react";
import alertContext from "../context/alerts/alertContext";

// eslint-disable-next-line

const Alert = () => {
    const context = useContext(alertContext);
    const {alert} = context;
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: "40px", position: "fixed" }}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissable fade show `} role="alert">
                <strong>{capitalize(alert.type)}</strong>: {alert.msg}
            </div>}
        </div>
    )
}

export default Alert ;
