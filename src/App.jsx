import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Bootstrap Components
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// My Components
import WeatherCard from './components/WeatherCard.jsx'
import TravelCard from './components/TravelCard.jsx';

function App() {
  const [travelDay, setTravelDay] = useState(null);
  const [weatherDays, setWeatherDays] = useState([]);
  const getTravel = () => {
    axios.get('http://localhost:3000/days').then((res) => {
      setTravelDay(res.data)
    })
  }

  const getWeather = () => {
    axios.get('https://api.weather.gov/points/33.1834,-96.6318').then((res) => { axios.get(res.data.properties.forecast).then((weatherRes) => {
      const weatherData = weatherRes.data.properties.periods;
      setWeatherDays(weatherData);
    })})
  }

  useEffect(() => {
    getWeather();
    
  }, []);

  return (
		<Container>
			<h1>Weather Travel Guide</h1>
			<p>{weatherDays ? weatherDays.map((days) => {
        return <div>
          {days.name}
          {days.temperature}
          </div>;
      }) : ' '}</p>
			<Row>
				<WeatherCard />
				<TravelCard />
			</Row>
		</Container>
	);
}

export default App;
