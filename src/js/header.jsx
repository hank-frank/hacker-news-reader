import React, { useState, useEffect } from 'react';

function header (props) {


    return (
        <>
            <div className="header">
                <div className="top-bar">
                    <h6 onClick={props.callTop} className="click">Top</h6>
                    <h6 onClick={props.callNew} className="click">New</h6>
                    <h6 onClick={props.callBest} className="click">Best</h6>
                <h4 className="header-title">Hacker News Reader!</h4>
                </div>
            </div>
        </>
    );
}

export default header