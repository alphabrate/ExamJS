var getParts = function() {
    var parts = [];
    var a = [];
    for (var i = 0; i < data.answers.length; i++) {
        if (parts.indexOf(data.answers[i][1]) == -1) {
            parts.push(data.answers[i][1]);
        }
    }
    for (var i = 0; i < parts.length; i++) {
        // Get how many true in each part answers[i][0] = true/false
        var count = 0;
        for (var j = 0; j < data.answers.length; j++) {
            if (data.answers[j][1] == parts[i]) {
                count++;
            }
        }
        a.push([parts[i], count]);
    }

    return a;
}
var c = 0;

function chart(title, data, type = 'pie') {
    $('#c1').append(`<div id='cc${c}'></div>`);
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: title
    };
    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };
    var series = [{
        type: type,
        name: `占比`,
        data: data
    }];
    var credits = {
        enabled: false
    };

    var json = {};
    json.chart = chart;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    json.credits = credits;
    $(`#cc${c}`).highcharts(json);
    c++;
}

var start = () => {
    document.getElementById('name').innerHTML = 'Name: ' + data.noCorrectAnswerQuestions[0][1] + '<br>Age: ' + data.noCorrectAnswerQuestions[1][1];
    chart(`The proportion of each part`, getParts());
    chart(`Right and wrong ratio chart`, [
        ['Correct', data.correct],
        ['Wrong', data.quantity - data.correct]
    ]);
    $('#c1').append(`Correct %: ${data.correctPercentage}`);
    $('#c1').append(`<br>`);
    $('#c1').append(`Correct Amount: ${data.correct}/${data.quantity}`);
    $('#c1').append(`<br>`);
    $('#c1').append(`Non Answered: ${data.notAnswred}`);
    $('#c1').append(`<br>`);
}