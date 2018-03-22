
$(document).ready(function () {
    var jsonData = null;

    var url2 = "http://nackowskis.azurewebsites.net/api/Auktion/200/";

    /******************************************************************/
    // ReSharper disable once JoinDeclarationAndInitializerJs
    var populateTable;
    var loadAjaxCall = function () {
        var myRequest = new XMLHttpRequest();
        myRequest.open('GET', url2);
        myRequest.onload = function () {
            jsonData = JSON.parse(myRequest.responseText);

            //makeTable(jsonData);
            //anotherTable();
            populateTable();
        };
        myRequest.send();
    };
    populateTable = function () {
        var col = [];
        for (var i = 0; i < jsonData.length; i++) {
            for (var key in jsonData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }

            }
        }
        var table = document.getElementById("example");
        var row;
        var cell;

        var tBody = document.createElement("tbody");
        table.appendChild(tBody);

        for (var j = 0; j < jsonData.length; j++) {
            row = tBody.insertRow(-1);
            for (var i = 0; i < col.length; i++) {
                cell = row.insertCell(-1);
                cell.innerHTML = jsonData[j][col[i]];

            }
        }
    };
    window.onload = loadAjaxCall;
});
