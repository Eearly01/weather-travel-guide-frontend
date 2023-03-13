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
  const [destination, setDestination] = useState('');
  const [formData, setFormData] = useState({});


  const getTravel = () => {
    axios.get('http://localhost:3000/days').then((res) => {
      setTravelDay(res.data)
    })
  }

  const getWeather = (lat, lon) => {
    axios.get(`https://api.weather.gov/points/${lat},${lon}`).then((res) => { axios.get(res.data.properties.forecast).then((weatherRes) => {
      const weatherData = weatherRes.data.properties.periods;
      setWeatherDays(weatherData);
    })})
  }

  const formSubmit = (e) => {
    getWeather(e.target.lat.value, e.target.lon.value)
  }

  // const getCoord = (city) => {
  //   axios
	// 		.get(
	// 			`http://api.positionstack.com/v1/forward?access_key=e026284d53537011e39ea26b87d8dd4f&query=1600%20PennsylvaniaAveNW,Washington%20DC`
	// 		)
	// 		.then((res) => {
	// 			console.log(res.data.results[0]);
	// 			let lat = res.data.results[0].latitude;
	// 			let lon = res.data.results[0].longitude;
	// 			console.log(lat);
	// 			getWeather(lat, lon);
	// 		});
  // }


  // const cityOrCoord = (e) => {
  //   console.log(e.target.name.value);
  //   getCoord(e.target.name.value);
  // }

  useEffect(() => {
    //getWeather();
    
  }, []);

  return (
		<Container>
			<h1>Weather Travel Guide</h1>
			<form onSubmit={formSubmit}>
				Longitude: <input type='text' name='lon' />
				Latitude: <input type='text' name='lat' />
				<input type='submit' value='Submit' />
			</form>
			<p>
				{weatherDays
					? weatherDays
          .map((days) => {
							return (
								<div>
									{days.name}
									{days.temperature}
								</div>
							);
					})
					: ' '}
			</p>
			<Row>
				<WeatherCard />
				<TravelCard />
			</Row>
		</Container>
	);
}

export default App;
