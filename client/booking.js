$(document).ready(function () {

    // Button Handler für Catsrun (Spiel)
    $('#stop').click(stop);
    $('#start').click(start);

    $('#load_bookings').click(getBookings);
    $('#form_save').submit(function (e) {
        e.preventDefault();
        console.log(JSON.stringify($(this).serializeArray()));
        // Ausgabe: [{"name":"dogname","value":"d"},{"name":"description","value":"ddds"},{"name":"date","value":"d"}]
        var formData = $("#form_save").serializeArray();

        if ($("#id").is(':empty')) {
            var booking = new Object();
            for (var i = 0; i < formData.length; i++) {
                if (formData[i].name == "dogname") {
                    booking.dogname = formData[i].value;
                }
                if (formData[i].name == "date_from") {
                    booking.dateFrom = formData[i].value;
                }
                if (formData[i].name == "date_to") {
                    booking.dateTo = formData[i].value;
                }
            }
            console.log("Booking:" + JSON.stringify(booking));

            $.ajax({
                type: "POST",
                url: domain + '/api/bookings',
                data: booking,
                success: function () {
                },
                dataType: "json",
                async: false,
                //contentType : "application/json",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                crossDomain: true
            });
            emptyBookingForm();

        } else {
            console.log('update');
            var booking = new Object();
            for (var i = 0; i < formData.length; i++) {
                booking.id = $("#id").html();
                if (formData[i].name == "dogname") {
                    booking.dogname = formData[i].value;
                }
                if (formData[i].name == "date_from") {
                    booking.dateFrom = formData[i].value;
                }
                if (formData[i].name == "date_to") {
                    booking.dateTo = formData[i].value;
                }
            }
            console.log("Booking:" + JSON.stringify(booking));
            console.log(domain + '/api/bookings/' + booking.id);

            // Inhalt am Server updaten
            $.ajax({
                type: "PUT",
                url: domain + '/api/bookings/' + booking.id,
                data: booking,
                async: false,
                success: function () {
                },
                dataType: "json",
                //contentType : "application/json",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                crossDomain: true
            });
            emptyBookingForm();

        }
    });
    $('#load_bookings').click();
});


function emptyBookingForm() {
    $("#id").text("");
    $("#dogname").val("");
    $("#date_from").val("");
    $("#date_to").val("");
    getBookings();
}

function deleteBooking(id) {
    $.ajax({
        type: "DELETE",
        url: domain + '/api/bookings/' + id,
        success: function () {
        },
        dataType: "json",
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        crossDomain: true
    });
    $('#load_bookings').click();
}

function fillBookingForm(id) {

    var booking;

    $.ajax({
        url: domain + '/api/bookings/' + id,
        async: false,
        success: function (response) {
            booking = response;
            console.log("GET:" + response);
            console.log("GET:" + booking.id);
        }
    });

    console.log("fill:" + booking.id);
    $("#id").html(booking.id);
    $("#dogname").val(booking.dogname);
    $("#date_from").val(booking.dateFrom);
    $("#date_to").val(booking.dateTo);

}

function getBookings() {
    $.ajax({
        url: domain + '/api/bookings',
        success: function (response) {
            var trHTML = "<table id='bookings_table' class='table table-striped table-bordered' cellspacing='0' width='100%' border='1'>" +
                "<tr><th>ID</th><th>Dogname</th><th>von</th><th>bis</th><th>Delete</th><th>Edit</th></tr>";
            $.each(response, function (i, item) {
                console.log(item);
                console.log(JSON.stringify(item));
                console.log(i);
                trHTML +=
                    "<tr>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.dogname + "</td>" +
                    "<td>" + item.dateFrom + "</td>" +
                    "<td>" + item.dateTo + "</td>" +
                    "<td>" +
                    "<a href='javascript:void(0);' onclick='deleteBooking(" + item.id + ")' >Delete</a>" + "</td>" +
                    "<td>" +
                    "<a href='javascript:void(0);' onclick='fillBookingForm(" + item.id + ")' >Edit</a>" + "</td>" +
                    "</td>" +
                    "</tr>"
            });
            trHTML += "</table>";
            $("#bookings_table").html(trHTML);
        }
    });
    ;
}
