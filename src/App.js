import logo from './logo.svg';
import './App.css';
import Ride from './Ride';
import configData from "./config.json";
import React, {useState, useEffect} from 'react'

function App() {

  const [rides, setRides] = useState(null);
  React.useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        "proxy": configData.SERVER_URL,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch(configData.SERVER_URL + "/rides ", requestOptions)
        .then(response => response.json())
        .then(data => setRides(data));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

function renderRidesList() {
    if (!rides) return null;

    return rides.map((x,i) => (
      <Ride key={i} distance= {x.distance} ride_id= {x.id} start_time= {x.startTime} duration= {x.duration}/>
    ));
  }
/*rides.map((x,i) => (
      x.distance
    ));*/
console.log(rides);
if (rides){
var map1 = rides.map(x => <Ride distance= {x.distance} ride_id= {x.id} start_time= {x.startTime} duration= {x.duration}/>);
console.log(map1);
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
      <div>
      <h2> BCG taxi ride mini demo </h2>
      </div>
      <ul>
      <li>
        <div class="ride">
            <div class="ride_id"><h4>Ride Id</h4></div>
            <div class="price"><h4>Price</h4></div>
            <div class="clicked"><h4>Is clicked</h4></div>
        </div>
      </li>
      {renderRidesList()}
      </ul>
      </body>
    </div>
  );
}

export default App;
