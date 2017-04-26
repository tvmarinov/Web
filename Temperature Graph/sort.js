

var chartSelector = document.getElementById("mainChart");
var sortChartSelector = document.getElementById("sortChart");
var sortBtn = document.getElementById("sortBtn");
var clearBtn = document.getElementById("clearBtn");



var fromYear = document.getElementById("YearFrom");
var fromMonth = document.getElementById("MonthFrom");
var fromDay = document.getElementById("DayFrom");
var toYear = document.getElementById("YearTo");
var toMonth = document.getElementById("MonthTo");
var toDay = document.getElementById("DayTo");


var sortArray1 = [];
var sortArray2 = [];
var sortArray3 = [];
var sortLabelsArr = [];


var sortChart = new Chart(sortChartSelector, {
    type: 'line',
    data: {
        labels: sortLabelsArr,
        datasets: [{
            label: "Малък басейн",
            data: sortArray1,
            radius:0.1
        }, {
            label: "Голям басейн",
            data: sortArray2,
            radius:0.1
        }, {
            label: "Вътрешен басейн",
            data: sortArray3,
            radius:0.1
        },
        ]
    },
    options: {
        responsive: true
    }
});

sortBtn.addEventListener("click", function sort() {

    $("#mainChart").hide();
    $("#sortChart").show();

    sortArray1.length = 0;
    sortArray2.length = 0;
    sortArray3.length = 0;
    sortLabelsArr.length = 0;

    var splitData;

    var data = {
        fromDate: fromYear.value + "-" + fromMonth.value + "-" + fromDay.value,
        toDate: toYear.value + "-" + toMonth.value + "-" + toDay.value, 
    };

    $.get('sort.php', data, function (msg) {
        var data = msg.split(";");
        var splitData;
        var i;

        for(i = 0; i < data.length - 1; i+=1){
            splitData = data[i].split(" ");
            sortLabelsArr.push(splitData[0] + " " + splitData[4] );
            sortArray1.push(splitData[1]);
            sortArray2.push(splitData[2]);
            sortArray3.push(splitData[3]);
        }
        sortChart.update();
    });
}, false);

clearBtn.addEventListener("click", function clear() {
    $("#sortChart").hide();
    $("#mainChart").show();
})