let weather = {
    apiKey: "f096e7fc86d8596d027e1dbaf66930b7",
    unsplashKey: "ek5Lk0mEUvWBjbNxBPRsFCeGGEleO_XnNQgkdcv2vbg",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data, city));
    },
    fetchImage: function (city) {
      return fetch(
        "https://api.unsplash.com/search/photos?page=1&query=" +
          city +
          "&client_id=" +
          this.unsplashKey
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("No image found.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.results.length > 0) {
            // Append dimensions to the image URL
            return `${data.results[0].urls.raw}&w=1600&h=900&fit=crop`;
          } else {
            return "https://source.unsplash.com/1600x900/?nature"; // Default fallback image
          }
        });
    },
    displayWeather: function (data, city) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
  
      // Fetch and set the background image
      this.fetchImage(city)
        .then((imageUrl) => {
          document.body.style.backgroundImage = `url('${imageUrl}')`;
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Delhi");
  
