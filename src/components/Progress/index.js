import React, { useEffect, useState } from 'react'
import { convertDate, convertToJSDate } from '../../utils';

const Progress = ({ type = 'view' }) => {
    return type === 'set' ? <SetProgress /> : <ViewProgress />
}

const SetProgress = () => {
    const [progress, SetProg] = useState(JSON.parse(localStorage.getItem('progress')) || []);
    const [anyGoalForToday, setToday] = useState(false)
    const [selectedDate, setDate] = useState(convertDate(new Date()));

    const updateProgress = (goal, date, status) => {
        const newProgress = progress?.map(record => {
            if (record.goal === goal) {
                let newStatus = record?.status?.map(statusRecord => {
                    if (statusRecord.date == date) {
                        return { ...statusRecord, isCompleted: status }
                    }
                    else {
                        return statusRecord
                    }
                })
                return { ...record, status: newStatus };
            }
            else {
                return record;
            }
        })
        SetProg(newProgress)
        localStorage.setItem("progress", JSON.stringify(newProgress))
    }
    useEffect(() => {
        function check(){
            let atleastOne = false;
            progress?.forEach(record => {
                record.status?.forEach(statusRecord => {
                if (statusRecord.date == selectedDate) {
                    atleastOne = true;
                }
            })})
            if(!progress){
                setToday(false)
            }
            setToday(atleastOne)
        }
        check();
    }, [])


    return anyGoalForToday ? (<div className="card">
       <h4 className="currentdate">Today's Sadhana</h4>
        {progress && progress?.map((record, index) => (
            record.status?.map(statusRecord => statusRecord.date == selectedDate &&
                (<div className={`progress-status ${statusRecord.isCompleted ? 'complete' : 'wip'}`} onClick={() => { updateProgress(record.goal, statusRecord.date, !statusRecord.isCompleted) }}>
                    <div>{index + 1}</div>
                    <div>{record.goal}</div>
                </div>))
        ))}</div>) : <>
        <div className="card" style={{ marginBottom: "0.5rem" }}>
            <p style={{ textAlign: "center", fontWeight: 300, fontSize: '0.9rem' }}>Sadhana (Sanskrit: साधन) is a Sanskrit term used to refer to a daily practice (could be physical, mental or spiritual). Anything that is practiced with awareness, discipline and the intention of growth can be considered as Sadhana</p>
        </div>
        <div className="card" style={{ marginBottom: "0.5rem" }}>
            <p style={{ textAlign: "center", fontWeight: 300, fontSize: '0.9rem' }}>Put simply, Sadhana means dedicated practice. Typically it lasts 15, 21 or 30 days and will inevitably shake you free from your usual routine by creating new healthier habits</p>
        </div>
        <div className="card" style={{ marginBottom: "0.5rem" }}>
            <p style={{ textAlign: "center", fontWeight: 300, fontSize: '0.9rem' }}>The purpose of this app is simply to help you keep track of your Sadhana. You can add a Sadhana and set the duration. Everyday, when you complete your Sadhana, you can mark it as complete.</p>
        </div>
        <div className="card" style={{ marginBottom: "0.5rem" }}>
            <p style={{ textAlign: "center", fontWeight: 300, fontSize: '0.9rem' }}>A Sadhana could be as simple as a hair care routine, or a yoga practice or solving a puzzle or watering your plants</p>
        </div>
    </>
}

const ViewProgress = ({ selectedGoal }) => {
    const [progress, _] = useState(JSON.parse(localStorage.getItem('progress')) || []);
    const goal = progress.find(record => record.goal === selectedGoal)
    const [currentGoal, setCurrentGoal] = useState(goal.status || [])

    return (<div className="grid-3">
        {currentGoal && currentGoal?.map(record => (<div className={`grid-date ${record.isCompleted && 'complete'}`}>
            <div>{record.date}</div>
        </div>))}
    </div>)
}

export { Progress, ViewProgress }