var responseData = [];
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        //console.log(req.responseText);
        responseData = JSON.parse(req.responseText);
        console.log(responseData);
        document.getElementById("available").innerHTML = 'Available Offers ' + responseData.length;
        createList(responseData);
    }
};

req.open("GET", "https://api.jsonbin.io/b/5ff7e18809f7c73f1b6f05e3/2", true);
req.setRequestHeader("secret-key", "$2b$10$XnRQ8lXD0phXmFoYQp5.VOBeiO3TmKBs8hfmZ2Uw04Ju3rpP/Bi6i");
req.send();

function createList(responseData) {
    document.getElementById("productListData").innerHTML = '';
    responseData.forEach((item, index) => {
        document.getElementById("productListData").innerHTML += '<div class="col-lg-6 content"><div class="productList"><h3>' + item.Year + ' ' + item.Name + '</h3><figure><img src="' + item.Image + '" alt=""><figcaption>' + item.Rate + '/Day</figcaption></figure><ul><li>sports</li><li>' + item.Gearbox_type + '</li><li>' + item.Capacity + ' passengers</li><li>' + item.Fuel_type + '</li></ul></div></div>';
    });

    //jquery used only for pagination
    pageSize = 6;
    gridSize = Math.ceil(responseData.length / pageSize);

    for (var i = 0; i < gridSize; i++) {
        if (i == 0)
            $("#pagin").append('<li><a class="current" href="javascript:void(0);">' + (i + 1) + '</a></li>');
        else
            $("#pagin").append('<li><a href="javascript:void(0);">' + (i + 1) + '</a></li>');
    }

    showPage = function(page) {
        $(".content").hide();
        $(".content").each(function(n) {
            if (n >= gridSize * (page - 1) && n < gridSize * page)
                $(this).show();
        });
    }

    showPage(1);

    $("#pagin li a").click(function() {
        $("#pagin li a").removeClass("current");
        $(this).addClass("current");
        showPage(parseInt($(this).text()))
    });
    //jquery used only for pagination
}

function onFilterChange() {
    let gearFilter = document.getElementById("gearFilter").value;
    let fuelFilter = document.getElementById("fuelFilter").value;

    if (gearFilter != '' || gearFilter != '') {
        var temp = responseData.filter(item => item.Fuel_type == fuelFilter || item.Gearbox_type == gearFilter);
        createList(temp);
    } else {
        createList(responseData);
    }
}

function mobileMenu() {
    var a = document.getElementById("mobileLinks");
    if (a.style.display === "block") {
        a.style.display = "none";
    } else {
        a.style.display = "block";
    }
}