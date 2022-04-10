import React, { useState } from 'react'

const Accordion = ({ goal, children, active, setActive }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="card">
            <div className="acc-title" onClick={() => { setShow(!show); setActive(goal.task) }}>{goal.task}</div>
            {show && active === goal.task && (
                <div className="acc-body">
                    {children}
                </div>)}
        </div>
    )
}

export default Accordion