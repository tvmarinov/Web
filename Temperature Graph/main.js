"use strict";


const oneMinute = 60000;
const fiveMinutes = 300000;
const xAxisLength = 10;

var chartSelector = document.getElementById("mainChart");
var sortChartSelector = document.getElementById("sortChart");
var currTemp = document.getElementsByClassName("currTvalue");

var dataArr = [];
var dataArr2 = [];
var dataArr3 = [];
var labelsArr = [];


var chart = new Chart(chartSelector, {
    type: 'line',
    data: {
        labels: labelsArr,
        datasets: [{
            label: "Малък басейн",
            data: dataArr,
        }, {
            label: "Голям басейн",
            data: dataArr2,
        }, {
            label: "Вътрешен басейн",
            data: dataArr3,
        },
        ]
    },
    options: {
        responsive: true,
    }
});

$("#sortChart").hide();         
        
window.onload = function(){
    var xhr = new XMLHttpRequest();             
    xhr.onload = function () {
        var prs = JSON.parse(this.responseText);
        currTemp[0].innerHTML = prs.smallT;
        currTemp[1].innerHTML = prs.largeT;
        currTemp[2].innerHTML = prs.innerT;
        currTemp[3].innerHTML = prs.outerT;
    }
    xhr.open("get", "db.php", true);
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    xhr2.onload = function(){
        var data = this.responseText;
        var array = data.split(";");
        for(var i = 0; i<10;i+=1){
            var temp = array[i].split(" ");
            dataArr.push(temp[1]);
            dataArr2.push(temp[2]);
            dataArr3.push(temp[3]);
            labelsArr.push(temp[0] + " " + temp[5]);
        }
    }
    xhr2.open("get", "onload.php", true);
    xhr2.send();
}

setInterval(function Update() {

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var prs = JSON.parse(this.responseText);
        if (labelsArr.length >= xAxisLength) {
            labelsArr.shift();
            dataArr.shift();
            dataArr2.shift();
            dataArr3.shift();
        }
        labelsArr.push(prs.date + " " + prs.time);
        dataArr.push(prs.smallT);
        dataArr2.push(prs.largeT);
        dataArr3.push(prs.innerT);
        chart.update();

        currTemp[0].innerHTML = prs.smallT;
        currTemp[1].innerHTML = prs.largeT;
        currTemp[2].innerHTML = prs.innerT;
        currTemp[3].innerHTML = prs.outerT;
    }
    xhr.open("get", "db.php", true);
    xhr.send();
}, fiveMinutes);

