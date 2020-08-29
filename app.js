$(() => {
  const $container = $("<div class='week-container'>");
  //CHANGE THE DAY OF THE WEEK TO BE DYNAMIC
  const dayOfTheWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const $closeButton = $("<br /><button id='close-button'>Close closet</button><br />")
  const fahrenheitSymbol = $("<span>&#8457;</span>");
  const percentageSymbol = $("<span>&#37;</span>");

  $("body").append($container);
  $("#closet-button").on("click", () => {
    $("img").fadeIn(2000);
    $("#drag-msg").show();
    $("#closet-button").hide();
    $('body').append($closeButton)
    $closeButton.show()
  });

  $closeButton.on("click", () => {
      $("img").fadeOut(1000);
      $("#drag-msg").hide();
      $("#closet-button").show()
      $closeButton.hide()
  });

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
    const $date = $(
      `<span>Date: </span><span id='date${i}' class="date"></span><br />`
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
      $date,
      $description,
      $tempHigh,
      $tempLow,
      $windSpeed,
      $humidity
    );
  }

  for (let i = 0; i < 5; i++) {
    const $outfitDiv = $(
      `<div id="${dayOfTheWeek[i]}${i}"  class="ui-widget-header droppable outfit"></div>`
    );
    $container.append($outfitDiv);
  }

  $(function () {
    $(".draggable").draggable();
    $(".droppable").droppable({
      drop: function (event, ui) {
        $(this)
          .addClass("ui-state-highlight")
          .find($("img"))
          .css("background", "white");
      },
    });
  });

  $("form").on("submit", (event) => {
    event.preventDefault();
    const zipcode = $("input").val();

    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&units=imperial&appid=8427b9145053fa92079d70aa4f4483ee`,
    }).then((data) => {
      for (let i = 0; i < data.list.length; i++) {
        $(`#date${i}`).html(data.list[i].dt_txt);
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
