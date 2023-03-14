import axios from 'axios'
import { useState } from 'react'

import {Col} from 'react-bootstrap'

const UpdateWeatherCardFrom = (props) => {
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .put('http://localhost:3000/days', {
                latitude: formData.latitude,
                longitude: formData.longitude,
            })
        .then((res) => {
            props.setUpdated(!props.updated)
        })
        .catch((err) => console.log(err))
    setFormData({})
    }

    return (
        <Col sm={12} md={{ span: 4, offset: 4 }}>
            <h2>Edit City</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="city">
                City
                </label>
                <input
                    onChange={handleChange}
                    className="form-control"
                    type="string"
                    name="city"
                    placeholder={props.weatherData.city}              
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </Col>
    );
}