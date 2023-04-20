import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
const PORT = process.env.REACT_APP_PORT;

function DayWeather(props) {

	const addToWeatherCards = (e) => {
		e.preventDefault();

		const newCard = {
			number: props.day.number,
			dayName: props.day.name,
			city: props.city.municipality,
			temp: props.day.temperature,
			tempUnit: props.day.temperatureUnit,
			windSpeed: props.day.windSpeed,
			windDirection: props.day.windDirection,
			probabilityOfPrecipitation: props.day.probabilityOfPrecipitation.value,
			detailedForecast: props.day.detailedForecast,
		};

		axios
			.get(`${PORT}/days`)
			.then((res) => {
				const existingCardIndex = res.data.findIndex(
					(card) => card.number === newCard.number
				);
				if (existingCardIndex !== -1) {
					// Delete the existing card with the same number
					const deleteUrl =
						`${PORT}/days/` +
						res.data[existingCardIndex]._id;
					axios
						.delete(deleteUrl)
						.then(() => {
							props.setUpdated(!props.updated);
						})
						.catch((err) => console.log(err));
				}
			})
			.catch((err) => console.log(err));

		// Insert the new card
		axios
			.post(`${PORT}/days`, newCard)
			.then(() => {
				props.setUpdated(!props.updated);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Card border='Primary' style={{ width: '18rem' } } className='day-card'>
				<Card.Body>
					<Card.Title className='day-title'>{props.city.municipality}</Card.Title>
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
