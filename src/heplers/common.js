export const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
export const coordsUrl = "http://api.openweathermap.org/geo/1.0/reverse";
export const appId = "64496c89f6baf98bda6b5dbb308ea1c7";

export const palpableTemperature = (
  <span className="underline">Ощутимая температура</span>
);
export const sunriseTime = <span className="underline">Время восхода</span>;
export const sunsetTime = <span className="underline">Время заката</span>;

export const localStorageOptions = JSON.parse(localStorage.getItem("options"));
export const localStorageSavedLocations = JSON.parse(localStorage.getItem("savedLocations"))

export const getPosition = () => {
  return new Promise((res, rej) => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => res(position),
        (error) => rej(error)
      );
  });
};

export const updateLocalStorageSavedLocations = (savedLocations) => {
  const savedLocationsData = savedLocations ? [...savedLocations] : []
  localStorage.setItem("savedLocations", JSON.stringify(savedLocationsData));
};

export const updateLocalStorageOptions = (showPalpableTemperature, showSunriseTime, showSunsetTime) => {
  const optionsData = {
    palpableTemperatureStorage: showPalpableTemperature,
    sunriseTimeStorage: showSunriseTime,
    sunsetTimeStorage: showSunsetTime,
  };

  localStorage.setItem("options", JSON.stringify(optionsData));
};

