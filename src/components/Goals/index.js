import React, { useEffect, useState } from 'react'
import {convertDate} from '../../utils'
import Accordion from '../Common/Accordion'
import { ViewProgress } from '../Progress'
const Goals = ({ type = 'view',setError }) => {
    return type === 'set' ? <SetGoal setError={setError}/> : <ViewGoals />
}

const SetGoal = ({setError}) => {
    const [goals, setGoals] = useState({
        task: '',
        from: '',
        to: ''
    })
    const onsubmit = () => {
        if(goals.task && goals.start && goals.to){
            let goalsLS = JSON.parse(localStorage.getItem('goals')) || [];
            goalsLS.push(goals)
            localStorage.setItem('goals', JSON.stringify(goalsLS));
            var start = new Date(goals.from);
            var end = new Date(goals.to);
            var loop = new Date(start);
            let progress = { goal: goals.task, status: [] }
            while (loop <= end) {
                //alert(loop);
                progress.status.push({ date: convertDate(loop), isCompleted: false })
                var newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }
            setGoals({ task: '', from: '', to: '' })
            let progressLS = JSON.parse(localStorage.getItem('progress')) || [];
            localStorage.setItem('progress', JSON.stringify([...progressLS, progress]))
        }
        else{
            setError('Please enter all inputs to proceed')
        }
    }
    return <div className='card'>
        <h3>Goal Setting</h3>
        <div className="field-group">
            <label>Enter a routine</label>
            <input maxLength="36" className='input' type="text" placeholder="Perform Hatha yoga" value={goals.task} onChange={e => { setGoals({ ...goals, task: e.target.value }) }} />
        </div>
        <div className="field-group">
            <label>Sadhana start date</label>
            <input className='input' type="date" value={goals.from} onChange={e => { setGoals({ ...goals, from: e.target.value }) }} />
        </div>
        <div className="field-group">
            <label>Sadhana end date</label>
            <input className='input' type="date" value={goals.to} onChange={e => { setGoals({ ...goals, to: e.target.value }) }} />
        </div>
        <div className="field-group">
            <button className="btn btn-primary" onClick={onsubmit}>Submit</button>
        </div>
    </div>
}

const ViewGoals = () => {
    const [goals, _] = useState(JSON.parse(localStorage.getItem('goals')) || []);
    const [active,setActive]=useState(goals.length>0 && goals[0]?.task);
    return (<div style={{maxHeight:"70vh",height:"70vh",minHeight:"70vh"}}>
        {goals.length>0 && <div className='card' style={{marginBottom:"1rem"}}>
            <h3>Sadhana List</h3>
        </div>}
        {goals.map(goal =>
            <div style={{marginBottom:"1rem"}}>
                <Accordion goal={goal} active={active} setActive={setActive}>
                    <ViewProgress selectedGoal={goal.task} />
                </Accordion>
            </div>

        )}
    </div>)
}

export default Goals