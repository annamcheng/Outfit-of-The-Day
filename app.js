$(() => {
  // CAROUSEL
  let currentImgIndex = 0;
  let lastImgIndex = $(".outfit-images").children().length - 1;
  const $outfitChildrenImg = $(".outfit-images").children();

  $(".left").on("click", () => {
    $outfitChildrenImg.eq(currentImgIndex).css("display", "none");

    if (currentImgIndex < lastImgIndex) {
      currentImgIndex++;
    } else {
      currentImgIndex = 0;
    }
    $outfitChildrenImg.eq(currentImgIndex).css("display", "block");
  });

  $(".right").on("click", () => {
    $outfitChildrenImg.eq(currentImgIndex).css("display", "none");
    if (currentImgIndex > 0) {
      currentImgIndex--;
    } else {
      currentImgIndex = lastImgIndex;
    }
    $outfitChildrenImg.eq(currentImgIndex).css("display", "block");
  });

  const $container = $("<div class='week-container'>");
  const dayOfTheWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const fahrenheitSymbol = $("<span>&#8457;</span>");
  const percentageSymbol = $("<span>&#37;</span>");

  $("body").append($container);

  for (let i = 0; i < 5; i++) {
    const $weekDiv = $(
      `<div class="week">${dayOfTheWeek[i].toUpperCase()}</div>`
    );
    $container.append($weekDiv);
  }

  for (let i = 0; i < 5; i++) {
    const $forecastDiv = $(
      `<div id="${dayOfTheWeek[i]}" class="forecast"></div>`
    );
    const $description = $(
      `<span>Description: </span><span id='description${i}' class="description"></span><br />`
    );
    const $tempHigh = $(
      `<span>Temp High: </span><span id='tempHigh${i}' class='tempHigh'></span><br />`
    );
    const $tempLow = $(
      `<span>Temp Low: </span><span id='tempLow${i}' class='tempLow'></span><br />`
    );
    const $windSpeed = $(
      `<span>Wind Speed: </span><span id='windSpeed${i}' class='windSpeed'></span><br />`
    );
    const $humidity = $(
      `<span>Humidity: </span><span id='humidity${i}' class='humidity'></span><br />`
    );
    $container.append($forecastDiv);
    $forecastDiv.append(
      $description,
      $tempHigh,
      $tempLow,
      $windSpeed,
      $humidity
    );
  }

  for (let i = 0; i < 5; i++) {
    const $outfitDiv = $(
      `<div id="${dayOfTheWeek[i]}${i}"  class="outfit"></div>`
    );
    $container.append($outfitDiv);
  }

  $("form").on("submit", (event) => {
    event.preventDefault();
    const zipcode = $("input").val();

    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&units=imperial&appid=8427b9145053fa92079d70aa4f4483ee`,
    }).then((data) => {
      for (let i = 0; i < data.list.length; i++) {
        $(`#description${i}`).html(data.list[i].weather[0].main);
        $(`#tempHigh${i}`).html(data.list[i].main["temp_max"]);
        $(`#tempLow${i}`).html(data.list[i].main["temp_min"]);
        $(`#windSpeed${i}`).html(data.list[i].wind.speed);
        $(`#humidity${i}`).html(data.list[i].main.humidity);
      }
      $(".tempHigh").append(fahrenheitSymbol);
      $(".tempLow").append(fahrenheitSymbol);
      $(".humidity").append(percentageSymbol);
      $(".windSpeed").append(" mph");
    });
  });
});
