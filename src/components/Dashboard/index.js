import React from 'react'
import {
  Link
} from "react-router-dom";
import { Progress } from '../Progress';
const Dashboard = () => {
  return (<>
    <div style={{ height: "70vh",maxHeight: "70vh",minHeight: "70vh" }}>
      <Progress type='set' />
    </div>
  </>
  )
}

export default Dashboard