import React, { useEffect } from 'react';
import { Card, Col, ListGroup, Button, Row } from 'react-bootstrap';
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
			<Row>
				<Col sm={6} md={4}>
					<Card border='Primary' style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>{props.city.municipality}</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>
								{props.day.name}
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
				</Col>
			</Row>
		</>
	);
}

export default DayWeather;
