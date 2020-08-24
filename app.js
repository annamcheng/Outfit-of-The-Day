$(() => {
  const $container = $("<div class='container'>");
  const dayOfTheWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  $("body").append($container);

  for (let i = 0; i < 5; i++) {
    const $weekDiv = $(
      `<div id="${dayOfTheWeek[i]}" class="week">${dayOfTheWeek[
        i
      ].toUpperCase()}</div>`
    );
    $container.append($weekDiv);
  }
  for (let i = 0; i < 5; i++) {
    const $forecastDiv = $(
      `<div id="${dayOfTheWeek[i]}" class="forecast"></div>`
    );
    $container.append($forecastDiv);
  }
  for (let i = 0; i < 5; i++) {
    const $outfitDiv = $(`<div id="${dayOfTheWeek[i]}" class="outfit"></div>`);
    $container.append($outfitDiv);
  }

  $("form").on("submit", (event) => {
    event.preventDefault();
    const zipcode = $("input").val();

    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&units=imperial&appid=8427b9145053fa92079d70aa4f4483ee`,
    }).then((data) => {
      for (let i = 0; i < data.list.length; i++) {
        $(`#description${i}`).html(data.list[i].weather[0].description);
        $(`#tempHigh${i}`).html(data.list[i].main["temp_max"]);
        $(`#tempLow${i}`).html(data.list[i].main["temp_min"]);
        $(`#windSpeed${i}`).html(data.list[i].wind.speed);
        $(`#humidity${i}`).html(data.list[i].main.humidity);
      }
    });
  });
});
