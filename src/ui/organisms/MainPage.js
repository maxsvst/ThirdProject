import React, { useState, useEffect } from "react";

import { Input } from "@mui/material";

import axios from "axios";

import {
  weatherUrl,
  coordsUrl,
  appId,
  getPosition,
  palpableTemperature,
  sunriseTime,
  sunsetTime,
  localStorageSavedLocations,
  updateLocalStorageSavedLocations,
  updateLocalStorageOptions,
  localStorageOptions,
} from "../../heplers/common";
import { SavedCities } from "../molecules/SavedCities";
import { Settings } from "../molecules/Settings";
import WeatherData from "../molecules/WeatherData";
import CurrentCity from "../molecules/CurrentCity";

export default function MainPage() {
  const [data, setData] = useState({});
  const [savedLocations, setSavedLocations] = useState(
    localStorageSavedLocations ? localStorageSavedLocations : []
  );
  const [showPalpableTemperature, setShowPalpableTemperature] = useState(() => {
    return localStorageOptions
      ? localStorageOptions.palpableTemperatureStorage
      : false;
  });
  const [showSunriseTime, setShowSunriseTime] = useState(() => {
    return localStorageOptions ? localStorageOptions.sunriseTimeStorage : false;
  });
  const [showSunsetTime, setShowSunsetTime] = useState(() => {
    return localStorageOptions ? localStorageOptions.sunsetTimeStorage : false;
  });

  const currentCity = data?.name;

  useEffect(() => {
    updateLocalStorageOptions(
      showPalpableTemperature,
      showSunriseTime,
      showSunsetTime
    );
  }, [showPalpableTemperature, showSunriseTime, showSunsetTime]);

  useEffect(() => {
    updateLocalStorageSavedLocations(savedLocations);
  }, [savedLocations]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const position = await getPosition().catch((error) => {
      console.error(error.message);
    });

    if (position) {
      const data = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        appid: appId,
      };

      const location = await axios
        .get(coordsUrl, { params: data })
        .then((resp) => resp.data[0]);
      getWeatherData(location.name);
    }
  }

  const getWeatherData = (city) => {
    const weatherData = {
      q: city,
      units: "metric",
      appid: appId,
    };

    axios
      .get(weatherUrl, { params: weatherData })
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const searchLocation = (e) => {
    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      e.target.value !== undefined
    ) {
      const city = e.target.value;
      getWeatherData(city);
    }
  };

  const deleteFromSavedCityList = (id) => {
    const updatedCityList = savedLocations.filter((item) => item.value !== id);
    setSavedLocations(updatedCityList);
  };

  const addCityToSavedCityList = () => {
    const isLocationAlreadyExists = savedLocations.filter(
      (item) => item.label === currentCity
    );
    if (
      isLocationAlreadyExists.length === 0 &&
      currentCity !== undefined &&
      currentCity !== ""
    ) {
      setSavedLocations([
        ...savedLocations,
        { value: savedLocations.length + 1, label: currentCity },
      ]);
    }
  };

  const onTogglePelpableTemperature = () =>
    setShowPalpableTemperature(!showPalpableTemperature); 
  const onToggleSunriseTime = () => setShowSunriseTime(!showSunriseTime); 
  const onToggleSunsetTime = () => setShowSunsetTime(!showSunsetTime); 

  const isPalableTemperatureVisible = showPalpableTemperature
    ? palpableTemperature
    : "Ощутимая температура";
  const isSunriseTimeVisible = showSunriseTime ? sunriseTime : "Время восхода";
  const isSunsetTimeVisible = showSunsetTime ? sunsetTime : "Время заката";

  return (
    <div className="mx-10 my-10 flex flex-col items-center">
      <div className="w-full flex items-center justify-evenly">
        <Settings
          onTogglePelpableTemperature={onTogglePelpableTemperature}
          onToggleSunriseTime={onToggleSunriseTime}
          onToggleSunsetTime={onToggleSunsetTime}
          isPalableTemperatureVisible={isPalableTemperatureVisible}
          isSunriseTimeVisible={isSunriseTimeVisible}
          isSunsetTimeVisible={isSunsetTimeVisible}
        />
        <Input
          className="min-w-[350px] "
          type="text"
          placeholder="Введите ваш город"
          onKeyPress={searchLocation}
        />
        <SavedCities
          savedLocations={savedLocations}
          getWeatherData={getWeatherData}
          deleteFromSavedCityList={deleteFromSavedCityList}
        />
      </div>
      <div className="flex flex-col items-center mt-20">
        <CurrentCity
          addCityToSavedCities={addCityToSavedCityList}
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
