import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List, Button, Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities")
      .then(r => {
        setActivities(r.data);
      })
  },[])

  return (
    <>
      <Navbar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
}

export default App;
