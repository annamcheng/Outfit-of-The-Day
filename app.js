$(() => {
    const $h1 = $('<h1>Outfit of The Day</h1>')
    const $container = $("<div class='container'>")
    const dayOfTheWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"]
    $("body").append($h1)
    $("body").append($container)

    for (let i = 0; i < 5; i++){
        const $weekDiv = $(`<div id="${dayOfTheWeek[i]}" class="week">${dayOfTheWeek[i].toUpperCase()}</div>`)
        $container.append($weekDiv)
    }
    for (let i = 0; i < 5; i++){
        const $forecastDiv = $(`<div id="${dayOfTheWeek[i]}" class="forecast"></div>`)
        $container.append($forecastDiv)
    }
    for (let i = 0; i < 5; i++) {
        const $outfitDiv = $(`<div id="${dayOfTheWeek[i]}" class="outfit"></div>`)
        $container.append($outfitDiv)
    }
$.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?appid=a7a2a762a83f880ce94286af0a41b891&q=Queens"
}).then((data) => {
        console.log(data)
    })
});
