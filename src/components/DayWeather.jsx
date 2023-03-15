import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

function DayWeather(props) {
	const [updated, setUpdated] = useState();

	const addToWeatherCards = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3000/days', {
			number: props.day.number,
			city: props.city.municipality,
			temp: props.day.temperature,
			windSpeed: props.day.windSpeed,
			windDirection: props.day.windDirection,
			probabilityOfPrecipitation: props.day.probabilityOfPrecipitation.value,
			detailedForecast: props.day.detailedForecast,
		}).then(() => {
			setUpdated(!updated);
		})
		
	};

	useEffect(() => {
		props.callApi();
	}, [updated]);

	return (
		<>
			<Card border='Primary' style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>{props.city.municipality}</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						{props.day.name}
					</Card.Subtitle>
					<Card.Subtitle>
						<img src={props.day.icon} alt=''/>
					</Card.Subtitle>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							Temperature: {props.day.temperature}
							{props.day.temperatureUnit}
						</ListGroup.Item>
						<ListGroup.Item>{props.day.windSpeed} Wind</ListGroup.Item>
						<ListGroup.Item>{props.day.windDirection}</ListGroup.Item>
						<ListGroup.Item>{props.day.detailedForecast}</ListGroup.Item>
					</ListGroup>
				</Card.Body>
				<Button onClick={addToWeatherCards}>Add To Trip</Button>
			</Card>
		</>
	);
}

export default DayWeather;
