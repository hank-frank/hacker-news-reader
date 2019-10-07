import React, { useState, useEffect } from 'react';

function header (props) {


    return (
        <>
            <div className="header">
                <div className="top-bar">
                    <h6 onClick={props.top} className="click">Top</h6>
                    <h6 onClick={props.new} className="click">New</h6>
                    <h6 onClick={props.best} className="click">Best</h6>
                </div>
                <h4 className="header-title">Hacker News Reader</h4>
            </div>
        </>
    );
}

export default header