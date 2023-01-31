import moment from 'moment'
import React from 'react'
import { weatherDataStyle } from '../styles/styles'

export default function WeatherData({ data, showPalpableTemperature, showSunriseTime, showSunsetTime }) {

    const temperature = data.main?.temp
    const palpableTemperature = data.main?.feels_like
    const sunriseTime = data.sys?.sunrise
    const sunsetTime = data.sys?.sunset

    return (
        <>
            {temperature &&
                <span className={weatherDataStyle}>
                    Температура: {temperature} °C
                </span>
            }
            {showPalpableTemperature && palpableTemperature &&
                <span className={weatherDataStyle}>
                    Ощущается как: {palpableTemperature} °C
                </span>
            }
            {showSunriseTime && sunriseTime &&
                <span className={weatherDataStyle}>
                    Время восхода: {moment(sunriseTime * 1000).format('HH:mm:ss')}
                </span>
            }
            {showSunsetTime && sunsetTime &&
                <span className={weatherDataStyle}>
                    Время заката: {moment(sunsetTime * 1000).format('HH:mm:ss')}
                </span>
            }
            <span className={weatherDataStyle + ' ' + 'text-center'}>
                Дата: {moment().format("DD.MM.YYYY")}
            </span>
        </>
    )
}