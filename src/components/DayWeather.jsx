import React, { useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import {Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function DayWeather(props) {
	const addToWeatherCards = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3000/days', {
			city: props.city.municipality,
			temp: props.day.temperature,
			windSpeed: props.day.windSpeed,
			windDirection: props.day.windDirection,
			probabilityOfPrecipitation: props.day.probabilityOfPrecipitation.value,
			detailedForcast: props.day.detailedForcast,
		});
	};

	return (
		<>
			<Col>
				<Card border='Primary' style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>{props.city.municipality}</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
							{props.day.name}
						</Card.Subtitle>
						<Card.Text>
							<p>
								{props.day.temperature}
								{props.day.temperatureUnit}
							</p>
							<p>{props.day.windSpeed}</p>
							<p>{props.day.windDirection}</p>
							<p>{props.day.detailedForecast}</p>
						</Card.Text>
					</Card.Body>
				</Card>
				<Button onClick={addToWeatherCards}>Add To Trip</Button>
			</Col>
		</>
	);
}

export default DayWeather;
