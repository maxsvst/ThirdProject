import React, { useState, useEffect } from "react";

import { MenuItem, Menu, Button, Input } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import axios from "axios";

import WeatherData from "../molecules/WeatherData";
import CurrentCity from "../molecules/CurrentCity";

export default function MainPage() {
  const [location, setLocation] = useState();
  const [data, setData] = useState({});
  const [savedLocations, setSavedLocations] = useState([]);
  const [showPalpableTemperature, setShowPalpableTemperature] = useState(false);
  const [showSunriseTime, setShowSunriseTime] = useState(false);
  const [showSunsetTime, setShowSunsetTime] = useState(false);

  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
  const coordsUrl = "http://api.openweathermap.org/geo/1.0/reverse";
  const currentCity = data?.name;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const position = await getCurrentPosition();

    const data = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      appid: "64496c89f6baf98bda6b5dbb308ea1c7",
    };

    const location = await axios
      .get(coordsUrl, { params: data })
      .then((resp) => resp.data[0]);
    getWeatherData(location.name);
    setLocation(location.name);
  };

  const getCurrentPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (position) => res(position),
        (error) => rej(error)
      );
    });
  };

  const getWeatherData = (city) => {
    const weatherData = {
      q: city,
      units: "metric",
      appid: "64496c89f6baf98bda6b5dbb308ea1c7",
    };

    axios
      .get(weatherUrl, { params: weatherData })
      .then((response) => setData(response.data));
  };

  const searchLocation = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      axios.get(getWeatherData(e.target.value)).then((response) => {
        setData(response.data);
      });
    }
  };

  const deleteFromSavedCityList = (id) => {
    const updatedCityList = savedLocations.filter((item) => item.value !== id);
    setSavedLocations(updatedCityList);
  };

  const addCityToSavedCities = () => {
    const isLocationAlreadyExists = savedLocations.filter(
      (item) => item.label === location
    );
    if (isLocationAlreadyExists.length === 0 && location !== "") {
      setSavedLocations([
        ...savedLocations,
        { value: savedLocations.length + 1, label: location },
      ]);
    }
  };

  const onTogglePelpableTemperature = () =>
    setShowPalpableTemperature(!showPalpableTemperature);
  const onToggleSunriseTime = () => setShowSunriseTime(!showSunriseTime);
  const onToggleSunsetTime = () => setShowSunsetTime(!showSunsetTime);

  const Settings = () => {
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Настройки
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={onTogglePelpableTemperature}>
                Ощутимая температура
              </MenuItem>
              <MenuItem onClick={onToggleSunriseTime}>Время восхода</MenuItem>
              <MenuItem onClick={onToggleSunsetTime}>Время заката</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  };

  const SavedCities = () => {
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Сохранённые города
            </Button>
            <Menu {...bindMenu(popupState)}>
              {savedLocations.map((item) => {
                return (
                  <div key={item.value} className="flex flex-row">
                    <MenuItem
                      onClick={() => getWeatherData(item.label)}
                      value={item.value}
                    >
                      {item.label}{" "}
                    </MenuItem>
                    <Button
                      className="hover:text-[#E02424]"
                      onClick={() => deleteFromSavedCityList(item.value)}
                    >
                      Х
                    </Button>
                  </div>
                );
              })}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  };

  return (
    <div className="mx-10 my-10 flex flex-col items-center">
      <div className="w-full flex items-center justify-evenly">
        <Settings />
        <Input
          className="min-w-[350px] "
          type="text"
          placeholder="Введите ваш город"
          onKeyPress={searchLocation}
          onChange={(e) => setLocation(e.target.value)}
        />
        <SavedCities />
      </div>
      <div className="flex flex-col items-center mt-20">
        <CurrentCity
          addCityToSavedCities={addCityToSavedCities}
          currentCity={currentCity}
        />
        <WeatherData
          data={data}
          showPalpableTemperature={showPalpableTemperature}
          showSunriseTime={showSunriseTime}
          showSunsetTime={showSunsetTime}
        />
      </div>
    </div>
  );
}
