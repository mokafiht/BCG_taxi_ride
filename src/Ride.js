import React, {useState, useEffect} from 'react'

const Ride = (props) => {
  const [isShow, setIsShow] = React.useState(false);

  var nightBonus = 0.5;
  var busyPeriodBonus = 1;

  const handleClick = () => {
    setIsShow(true);
    var h = Math.floor(props.duration / 3600);
    var m = Math.floor((props.duration - (h * 3600) ) / 60);
    var s = (props.duration - (h * 3600) - (m * 60));
    const startTime = new Date(props.start_time);
    var end_time = startTime;
    end_time.setSeconds(startTime.getSeconds() + props.duration);
    alert(h + ":" + m + ":" + s + " - " + end_time.toISOString());
  };

  var nightCoef = 0;
  var busyCoef = 0;

  const startTime = new Date(props.start_time);
  var dt = new Date(startTime)
  //dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset())

  var startNight = '6:00:00';
  var endNight = '20:00:00';  

  var startDate = new Date(dt.getTime());
  startDate.setHours(startNight.split(":")[0]);
  startDate.setMinutes(startNight.split(":")[1]);
  startDate.setSeconds(startNight.split(":")[2]);

  var endDate = new Date(dt.getTime());
  endDate.setHours(endNight.split(":")[0]);
  endDate.setMinutes(endNight.split(":")[1]);
  endDate.setSeconds(endNight.split(":")[2]);
  /*console.log(startTime);
  console.log(dt);
  console.log(startDate);
  console.log(endDate);*/
  if(!(startDate < dt && endDate > dt)){
    nightCoef = nightBonus; 
  }

  var startBusy = '16:00:00';
  var endBusy = '19:00:00';  

  startDate = new Date(dt.getTime());
  startDate.setHours(startBusy.split(":")[0]);
  startDate.setMinutes(startBusy.split(":")[1]);
  startDate.setSeconds(startBusy.split(":")[2]);

  endDate = new Date(dt.getTime());
  endDate.setHours(endBusy.split(":")[0]);
  endDate.setMinutes(endBusy.split(":")[1]);
  endDate.setSeconds(endBusy.split(":")[2]);

  if(startDate < dt && endDate > dt){
    busyCoef = busyPeriodBonus;
  }

  var dist = props.distance * 10;
  var remainder = dist % 2;
  var roundAdditif = 0;
  if (remainder > 0){
        roundAdditif = 1;
  }
  var result = Math.floor(dist/2);
  var price =  (1 + (0.5 + nightCoef + busyCoef) * (result + roundAdditif));

  //var price = 1 + (0.5 + nightCoef + busyCoef) * (props.distance * 5);

    return (
      <li>
        <div class="ride clickable" onClick={handleClick} id={props.distance > 2 && "red_background"} >
            <div class="ride_id">{props.ride_id}</div>
            <div class="price">{price} &euro;</div>
            {isShow &&
                <div class="clicked">Clicked</div>
            }
        </div>
      </li>
    )
}

export default Ride