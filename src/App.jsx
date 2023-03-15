import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// Bootstrap Components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// My Components
import TravelCard from './components/TravelCard.jsx';
import DayWeather from './components/DayWeather';

function App() {
	const [weatherDays, setWeatherDays] = useState([]);
	const [updated, setUpdated] = useState(false);
	const [city, setCity] = useState({});
	const [travelDays, setTravelDays] = useState([]);

	const callApi = () => {
		axios.get('http://localhost:3000/days').then((res) => {
			setTravelDays(res.data);
		});
	};

	const getWeather = (lat, lon) => {
		lat ? axios.get(`https://api.weather.gov/points/${lat},${lon}`).then((res) => {
			axios.get(res.data.properties.forecast).then((weatherRes) => {
				const weatherData = weatherRes.data.properties.periods;
				setWeatherDays(weatherData);
			});
		}) : console.log('Hey');
	};

	const formSubmit = (e) => {
		e.preventDefault();
		getCoord(e.target.city.value, e.target.state.value);
		setUpdated(!updated);
	};

	const getCoord = (city, state) => {
		axios
			.get(
				`https://api.tomtom.com/search/2/geocode/${city} ${state}.json?key=IvZAJEwT4tG2uDSoidDzUFkkuWgX8L5J`
			)
			.then((res) => {
				setCity(res.data.results[0].address);
				let lat = res.data.results[0].position.lat;
				let lon = res.data.results[0].position.lon;
				console.log(lat);
				getWeather(lat, lon);
			});
	};

	useEffect(() => {
		getWeather();
	}, [updated]);

	return (
		<Container>
			<TravelCard 
			travelDays = {travelDays}
			setTravelDays = {setTravelDays}
			callApi = {callApi}
			/>
			<h1>Weather Travel Guide</h1>
			<form onSubmit={formSubmit}>
				City: <input type='text' name='city' />
				State: <input type='text' name='state' />
				<input type='submit' value='Submit' />
			</form>
			<Row>
				{weatherDays
					? weatherDays.map((day, i) => {
							if (i % 2 === 0) {
								return (
									<Row key = {i}>
										<Col sm={6} md={4}>
											<DayWeather
												day={day}
												city={city}
												travelDays={travelDays}
												setTravelDays={setTravelDays}
												callApi={callApi}
											/>
										</Col>
										{weatherDays[i + 1] && (
											<Col sm={6} md={4}>
												<DayWeather
													day={weatherDays[i + 1]}
													city={city}
													travelDays={travelDays}
													setTravelDays={setTravelDays}
													callApi={callApi}
												/>
											</Col>
										)}
									</Row>
								);
							}
							return null;
					})
					: ' '}
			</Row>
		</Container>
	);
}

export default App;
