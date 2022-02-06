// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Ride from "./Ride";

let container = null;

function getPrice(distance, start_time) {
  var nightBonus = 0.5;
  var busyPeriodBonus = 1;
  var nightCoef = 0;
  var busyCoef = 0;

  const startTime = new Date(start_time);
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

  var dist = distance * 10;
  var remainder = dist % 2;
  var roundAdditif = 0;
  if (remainder > 0){
        roundAdditif = 1;
  }
  var result = Math.floor(dist/2);
  return  (1 + (0.5 + nightCoef + busyCoef) * (result + roundAdditif));
 }

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeRides = [{
    id: "1",
    distance: "2",
    startTime: "2020-06-19T13:01:17.031Z",
    duration: "5000"},
    {
    id: "2",
    distance: "3",
    startTime: "2020-06-19T16:01:17.031Z",
    duration: "6000"},{
    id: "3",
    distance: "1.5",
    startTime: "2020-06-19T19:01:17.031Z",
    duration: "5000"},{
    id: "4",
    distance: "2.4",
    startTime: "2020-06-19T22:01:17.031Z",
    duration: "7800"},{
    id: "5",
    distance: "3",
    startTime: "2020-06-19T01:01:17.031Z",
    duration: "1234"},{
    id: "6",
    distance: "123.2",
    startTime: "2020-06-19T04:01:17.031Z",
    duration: "5000"},{
    id: "7",
    distance: "0",
    startTime: "2020-06-19T07:01:17.031Z",
    duration: "3400"},{
    id: "8",
    distance: "0.1",
    startTime: "2020-06-19T10:01:17.031Z",
    duration: "5000"}
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeRides)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Ride distance= "2" ride_id= "1" start_time= "2020-06-19T13:01:17.031Z" duration= "5000" />, container);
  });
  expect(container.querySelector(".price").textContent).toBe(getPrice(fakeRides[0].distance, fakeRides[0].startTime) + " \u20AC");

    await act(async () => {
    render(<Ride distance= "3" ride_id= "2" start_time= "2020-06-19T16:01:17.031Z" duration= "6000" />, container);
  });
  expect(container.querySelector(".price").textContent).toBe(getPrice(fakeRides[1].distance, fakeRides[1].startTime) + " \u20AC");

    await act(async () => {
    render(<Ride distance= "1.5" ride_id= "3" start_time= "2020-06-19T19:01:17.031Z" duration= "5000" />, container);
  });
  expect(container.querySelector(".price").textContent).toBe(getPrice(fakeRides[2].distance, fakeRides[2].startTime) + " \u20AC");

    await act(async () => {
    render(<Ride distance= "2.4" ride_id= "4" start_time= "2020-06-19T22:01:17.031Z" duration= "7800" />, container);
  });
  expect(container.querySelector(".price").textContent).toBe(getPrice(fakeRides[3].distance, fakeRides[3].startTime) + " \u20AC");

    await act(async () => {
    render(<Ride distance= "3" ride_id= "5" start_time= "2020-06-19T01:01:17.031Z" duration= "1234" />, container);
  });
  expect(container.querySelector(".price").textContent).toBe(getPrice(fakeRides[4].distance, fakeRides[4].startTime) + " \u20AC");

    await act(async () => {
    render(<Ride distance= "123.2" ride_id= "6" start_time= "2020-06-19T04:01:17.031Z" duration= "5000" />, container);
  });
  expect(container.querySelector(".price").textContent).toBe(getPrice(fakeRides[5].distance, fakeRides[5].startTime) + " \u20AC");

    await act(async () => {
    render(<Ride distance= "0" ride_id= "7" start_time= "2020-06-19T07:01:17.031Z" duration= "3400" />, container);
  });
  expect(container.querySelector(".price").textContent).toBe(getPrice(fakeRides[6].distance, fakeRides[6].startTime) + " \u20AC");

    await act(async () => {
    render(<Ride distance= "0.1" ride_id= "8" start_time= "2020-06-19T10:01:17.031Z" duration= "5000" />, container);
  });
  expect(container.querySelector(".price").textContent).toBe(getPrice(fakeRides[7].distance, fakeRides[7].startTime) + " \u20AC");
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});