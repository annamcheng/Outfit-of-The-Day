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
      url: `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=8427b9145053fa92079d70aa4f4483ee`,
    }).then((data) => {
      $("#description").html(data.list[0].weather[0].description);
      $("#tempHigh").html(data.list[0].main["temp_max"]);
      $("#tempLow").html(data.list[0].main["temp_min"]);
      $("#windSpeed").html(data.list[0].wind.speed);
      $("#humidity").html(data.list[0].main.humidity);
    });
  });
});
