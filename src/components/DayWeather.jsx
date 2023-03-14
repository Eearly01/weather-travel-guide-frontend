import React, { useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function DayWeather(props) {
	const addToWeatherCards = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3000/days', {
			city: props.day.name,
			temp: props.day.temperature,
			windSpeed: props.day.windSpeed,
			windDirection: props.day.windDirection,
			probabilityOfPrecipitation: props.day.probabilityOfPrecipitation.value,
			detailedForcast: props.day.detailedForcast,
		});
	};

	return (
		<>
			<Card style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>{props.day.name}</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						Card Subtitle
					</Card.Subtitle>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
				</Card.Body>
			</Card>
			<p>
				{props.day.name}
				{props.day.temperature}
			</p>
			<Button onClick={addToWeatherCards}>Add To Trip</Button>
		</>
	);
}

export default DayWeather;
