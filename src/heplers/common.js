export const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
export const coordsUrl = "http://api.openweathermap.org/geo/1.0/reverse";
export const appId = "64496c89f6baf98bda6b5dbb308ea1c7"

export const palableTemperature = <span className="underline">Ощутимая температура</span>
export const sunriseTime = <span className="underline">Время восхода</span>
export const sunsetTime = <span className="underline">Время заката</span>

export const getCurrentPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (position) => res(position),
        (error) => rej(error)
      );
    });
  };

