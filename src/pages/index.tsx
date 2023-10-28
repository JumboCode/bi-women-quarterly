import { Button } from "./Button"

export default function Home() {
  return (
    <div>
    </div>
  )
}

export function fetchWeather() {
  fetch('https://api.weather.gov/gridpoints/BOX/69,92/forecast')
   .then(response => response.json())
   .then(data => console.log(data));

}