$(() => {
  const $container = $("<div class='week-container'>");
  //CHANGE THE DAY OF THE WEEK TO BE DYNAMIC
  const $squares = ["one", "two", "three", "four", "five"];
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
    const $weekDiv = $(`<div class="week" id="date${i}">Date . . .</div>`);
    $container.append($weekDiv);
  }

  for (let i = 0; i < 5; i++) {
    const $forecastDiv = $(
      `<div id="${$squares[i]}" class="forecast"></div>`
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
      `<div id="${$squares[i]}${i}"  class="ui-widget-header droppable outfit"></div>`
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
        url: `https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=${zipcode}&units=I&key=c48676848e2c4f5aa45c0fa1eeaf5e90`,
    }).then((info) => {
      for (let i = 0; i < info.data.length; i++) {
        $(`#date${i}`).html(info.data[i].valid_date);
        $(`#description${i}`).html(info.data[i].weather.description);
        $(`#tempHigh${i}`).html(info.data[i].max_temp);
        $(`#tempLow${i}`).html(info.data[i].low_temp);
        $(`#windSpeed${i}`).html(info.data[i].wind_spd);
        $(`#humidity${i}`).html(info.data[i].rh);
      }
      $(".tempHigh").append(fahrenheitSymbol);
      $(".tempLow").append(fahrenheitSymbol);
      $(".humidity").append(percentageSymbol);
      $(".windSpeed").append(" mph");
    });
  });
});
