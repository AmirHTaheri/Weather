
$(document).ready(function () {
    var jsonData = null;
    var col = [];
    var url1 = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var url2 = "&APPID=9f9b547c3aea1a9965fd3581c1acc432&units=metric";
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&APPID=caf10d0d6f3972d8459bb50ae245136d&units=metric";
    
    /******************************************************************/
    // ReSharper disable once JoinDeclarationAndInitializerJs
    var createTable;
    var loadAjaxCall = function () {
        
        var myRequest = new XMLHttpRequest();
        myRequest.open('GET', url);
        myRequest.onload = function () {
            jsonData = JSON.parse(myRequest.responseText);
            createTable();
        };
        myRequest.send();
    };

    btn.addEventListener("click", function () {
        var searchBox = document.getElementById("searchBox");
        var city = document.getElementById('searchCity').value;
        searchBox.value = city;
        var newUrl = url1 + city + url2;

        // Deleting the old table before creating the new one
        var element = document.getElementById("myTable");
        //debugger;
        element.outerHTML = "";
        delete element;

        var myRequest = new XMLHttpRequest();
        myRequest.open('GET', newUrl);
        myRequest.onload = function () {
            jsonData = JSON.parse(myRequest.responseText);
            //createSection();
            //debugger;
            createTable();
        };
        myRequest.send();
    });

    createTable = function () {
        var i;
        for (i = 0; i < jsonData.list.length; i++) {
            let data = jsonData.list[i];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }

                }
            }
        }

        // Create table
        var table = document.createElement("table");
        table.setAttribute("class", "tablesorter");
        table.classList.add('table');
        table.classList.add('table-hover');
        table.classList.add('table-responsive');

        table.setAttribute("id", "myTable");


        var thead = table.createTHead();
        thead.setAttribute("class", "thead-light");

        var row = thead.insertRow(-1);
        var cell;

        for (i = 0; i < col.length ; i++) {

            cell = row.insertCell(-1);

            switch(i) {
                case 0:
                    cell.innerHTML = "Date";
                    break;
                case 1:
                    cell.innerHTML = "Lowest Temp";
                    break;
                case 2:
                    cell.innerHTML = "highest Temp";
                    break;
                case 3:
                    cell.innerHTML = "Pressure";
                    break;
                case 4:
                    cell.innerHTML = "humidity";
                    break;
                case 5:
                    cell.innerHTML = "Wind Speed";
                    break;
                case 6:
                    cell.innerHTML = "Rain";
                    break;
                case 7:
                    cell.innerHTML = "Description";
                    break;
                case 8:
                    cell.innerHTML = "City";
                    break;
            }

        }

        var tBody = document.createElement("tbody");
        table.appendChild(tBody);

        var wedData = jsonData.list;
        for (var j = 0; j < wedData.length; j++) {
            var str = wedData[j].dt_txt;
            
            if (str.includes("15:00:00")) {
                row = tBody.insertRow(-1);
                for (i = 0; i < col.length; i++) {
                    cell = row.insertCell(-1);
                    switch (i) {
                        case 0:
                            cell.innerHTML = wedData[j].dt_txt.substr(0, 10);
                            console.log(cell.innerHTML);
                            break;
                        case 1:
                            if ( j>5 && wedData[j].main.temp_min > wedData[j - 6].main.temp_min) {
                                cell.innerHTML = wedData[j-6].main.temp_min;
                                console.log(cell.innerHTML);
                            } else {
                                cell.innerHTML = wedData[j].main.temp_min;
                                console.log(cell.innerHTML);
                            }
                            break;
                        case 2:
                            if (j > 0 && wedData[j].main.temp_max > wedData[j - 1].main.temp_max) {
                                cell.innerHTML = wedData[j].main.temp_max;
                                console.log(cell.innerHTML);
                            } else {
                                cell.innerHTML = wedData[j - 1].main.temp_max;
                                console.log(cell.innerHTML);
                            }
                            break;
                        case 3:
                            cell.innerHTML = wedData[j].main.pressure;
                            break;
                        case 4:
                            cell.innerHTML = wedData[j].main.humidity;
                            break;
                        case 5:
                            cell.innerHTML = wedData[j].wind.speed;
                            break;
                        case 6:
                            cell.innerHTML = wedData[j].weather[0].main;
                            break;
                        case 7:
                            cell.innerHTML = wedData[j].weather[0].description;
                            break;
                        case 8:
                            cell.innerHTML = jsonData.city.name;
                            break;
                    }
                }

            }
        }

        var myContainer = document.getElementById("myContainer");
        myContainer.appendChild(table);
    };
    window.onload = loadAjaxCall;
});

function sortTable(n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    var table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1) ; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function searchFunction(id) {
    var td, i;
    var input = document.getElementById(id);
    var filter = input.value.toUpperCase();
    var table = document.getElementById("myTable");
    var tr = table.getElementsByTagName("tr");
    var index = 0; //debugger;
    switch (id) {
        case "myInput":
            index = 0;
            break;
        case "Titel":
            index = 1;
            break;
        case "Beskrivning":
            index = 2;
            break;
        case "Gruppkod":
            index = 3;
            break;
        case "Price":
            index = 4;
            break;
        default:
            index = 0;
            break;

    }

    for (i = 0; i < tr.length; i++) {

        td = tr[i].getElementsByTagName("td")[index];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

