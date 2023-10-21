import Button from "@/pages/Button"
import { useState } from 'react';

export default function Home() {
  const [temp, setTemp] = useState("");
  const [forecast, setForecast] = useState("");

  const weatherData = () => {
    console.log("button was clicked");
    fetch('https://api.weather.gov/gridpoints/BOX/69,92/forecast')
    .then(response => response.json())
    .then(data => { 
          setTemp(data.properties.periods[0].temperature);
          setForecast(data.properties.periods[0].shortForecast); 
        });
  };

  return (
    <div> 
      <div> <Button onClick={weatherData} label="Update the current weather:"/> </div>
      <div> { "It is currently " + temp + " degrees in the Tufts area."} </div>
      <div> { "The current forecast is " + forecast + "." } </div>
    </div>
  )
}
