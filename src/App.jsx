import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// Bootstrap Components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// My Components
import WeatherCard from './components/WeatherCard.jsx';


function App() {
	const [travelDay, setTravelDay] = useState(null);
	const [weatherDays, setWeatherDays] = useState([]);
	const [destination, setDestination] = useState('');
	const [formData, setFormData] = useState({});
	const [updated, setUpdated] = useState(false);
	//   const [lat, setLat] = useState(null);
	//   const [lon, setLon] = useState(null);

	const getTravel = () => {
		axios.get('http://localhost:3000/days').then((res) => {
			setTravelDay(res.data);
		});
	};

	const getWeather = (lat, lon) => {
		console.log(lat);
		axios.get(`https://api.weather.gov/points/${lat},${lon}`).then((res) => {
			axios.get(res.data.properties.forecast).then((weatherRes) => {
				const weatherData = weatherRes.data.properties.periods;
				setWeatherDays(weatherData);
			});
		});
	};

	const formSubmit = (e) => {
		e.preventDefault();
		// console.log(e.target.lat.value);
		console.log(e.target.city.value);
		// setLat(e.target.lat.value);
		// setLon(e.target.lon.value);
		// getWeather(e.target.lon.value, e.target.lat.value);
		getCoord(e.target.city.value);
		setUpdated(!updated);
	};

	const getCoord = (city) => {
		axios
			.get(
				`https://api.tomtom.com/search/2/geocode/${city}.json?key=IvZAJEwT4tG2uDSoidDzUFkkuWgX8L5J`
			)
			.then((res) => {
				console.log(res.data.results[0]);
				let lat = res.data.results[0].position.lat;
				let lon = res.data.results[0].position.lon;
				console.log(lat);
				getWeather(lat, lon);
			});
	};

	// const cityOrCoord = (e) => {
	//   console.log(e.target.name.value);
	//   getCoord(e.target.name.value);
	// }

	useEffect(() => {
		getWeather();
	}, [updated]);

	return (
		<Container>
			<h1>Weather Travel Guide</h1>
			<form onSubmit={formSubmit}>
				{/* Latitude: <input type='text' name='lat' />
				Longitude: <input type='text' name='lon' /> */}
				City: <input type='text' name='city' />
				<input type='submit' value='Submit' />
			</form>
			<p>
				{weatherDays
					? weatherDays.map((days) => {
							return (
								<div>
									<WeatherCard
										weatherDays={weatherDays}
										setUpdated={setUpdated}
										updated={updated}
										getWeather={getWeather}
										
									/>
									{days.name}
									{days.temperature}
								</div>
							)
						})
					: ' '}
			</p>
			<Row>
				
				
			</Row>
		</Container>
	);
}

export default App;
