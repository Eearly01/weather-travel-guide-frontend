import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

function DayWeather(props) {
	const [updated, setUpdated] = useState(false);

	const addToWeatherCards = (e) => {
		e.preventDefault();

		const newCard = {
			number: props.day.number,
			city: props.city.municipality,
			temp: props.day.temperature,
			tempUnit: props.day.temperatureUnit,
			windSpeed: props.day.windSpeed,
			windDirection: props.day.windDirection,
			probabilityOfPrecipitation: props.day.probabilityOfPrecipitation.value,
			detailedForecast: props.day.detailedForecast,
		};

		const existingCardIndex = props.cards.findIndex(
			(card) => card.number === newCard.number
		);
		if (existingCardIndex !== -1) {
			// Delete the existing card with the same number
			const updatedCards = [...props.cards];
			updatedCards.splice(existingCardIndex, 1);
			props.setCards(updatedCards);
		}

		// Find the index where the new card should be inserted based on its number
		let insertIndex = 0;
		while (
			insertIndex < props.cards.length &&
			props.cards[insertIndex].number < newCard.number
		) {
			insertIndex++;
		}

		// Insert the new card at the appropriate index
		const updatedCards = [...props.cards];
		updatedCards.splice(insertIndex, 0, newCard);
		props.setCards(updatedCards);
		setUpdated(!updated);
	};

	useEffect(() => {
		props.callApi();
	}, [updated]);

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
