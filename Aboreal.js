function navToggle() {
    var x = document.getElementById("content-toggle");
    if (x.className === "navigation-menu") {
        x.className += " responsive";
    } else {
        x.className = "navigation-menu";
    }
}
