import $ from "jquery";

function showError(e) {
  console.warn("Error", e);
}

function updateUI(info) {
  $("#app").text(JSON.stringify(info));
}

function getLocationURL([city, state]) {
  return `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%2C%20${state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: `https://api.github.com/users/${id}`,
      success: resolve,
      error: reject
    });
  });
}

function getWeather(location) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(location.split(",")),
      success: resolve,
      error: reject
    });
  });
}

$("#btn").on("click", async () => {
  const user = await getUser("3014zhangshuo");
  const weather = await getWeather(user.location);

  updateUI({
    user,
    weather
  });
});
