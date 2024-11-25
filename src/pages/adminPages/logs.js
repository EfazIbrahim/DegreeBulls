// degreebulls/src/pages/adminPages/logs.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './admin.css';

function Logs() {
    const actions = useSelector((state) => state.actions);

    useEffect(() => {
        console.log(actions); // Log the Redux store state
    }, [actions]);

    return (
        <div className="admin">
            <h1 className="admin-header">Logs</h1>
            <div>
                {actions.slice().reverse().map((action, index) => (
                    <h2 className="admin-log" key={index}>• {action}</h2>
                ))}
            </div>
        </div>
    );
}

export default Logs;