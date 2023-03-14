import React, { useEffect } from 'react'

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import axios from 'axios'

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
    }

    return (
			<>
				<p>
					{props.day.name}
					{props.day.temperature}
				</p>
                <Button onClick={addToWeatherCards}>
                    Add To Trip
                </Button>
			</>
		);
}

export default DayWeather