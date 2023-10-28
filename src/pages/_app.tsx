import "./globals.css";
import { useRef } from "react";
import { Button } from "./Button";
import { fetchWeather } from "./index";

export default function App() {
  const ref = useRef(null!);
  const handleClick = () => {
    console.log(fetchWeather(), ref.current);
  }
  return (
    <div className="App">
      <h1 className="title override">Bi Women Rule</h1>
      <h2 className="header override">Here's the Weather!</h2>
      <Button className="button override" onClick={handleClick} ref={ref}>
        Get Weather
      </Button>
    </div>
  );
}
