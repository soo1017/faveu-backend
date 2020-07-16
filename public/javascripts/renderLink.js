
var selected_value0;
var selected_value1;

$(document).on('click', '#id-landing-submit-btn', function (e) {
    e.preventDefault();
    if (document.getElementById('id-landing-btn').value === 'SUBMIT') {
        document.getElementById('id-landing-btn').value = 'CONFIRM';
        if (document.getElementById('ch0').checked) {
          selected_value0 = $('#name00 b').text();
        } else if (document.getElementById('ch1').checked) {
          selected_value0 = $('#name11 b').text();
        } else if (document.getElementById('ch2').checked) {
          selected_value0 = $('#name22 b').text();
        } else if (document.getElementById('ch3').checked) {
          selected_value0 = $('#name33 b').text();
        } else if (document.getElementById('ch4').checked) {
          selected_value0 = $('#name44 b').text();
        } else if (document.getElementById('re').checked) {
          selected_value0 = "reject";
        } 
    }
    if (document.getElementById('id-landing-btn').value === 'CONFIRM') {
        if (document.getElementById('ch0').checked) {
          selected_value1 = $('#name00 b').text();
          // selected_value0 = document.getElementById('ch0').value;
        } else if (document.getElementById('ch1').checked) {
          selected_value1 = $('#name11 b').text();
        } else if (document.getElementById('ch2').checked) {
          selected_value1 = $('#name22 b').text();
        } else if (document.getElementById('ch3').checked) {
          selected_value1 = $('#name33 b').text();
        } else if (document.getElementById('ch4').checked) {
          selected_value1 = $('#name44 b').text();
        } else if (document.getElementById('re').checked) {
          selected_value1 = "reject";
        } 

        if (selected_value0 === selected_value1) {
            var data = `selected=${selected_value1}`;

            var http1 = new XMLHttpRequest();
            var url = "https://www.faveu.com/faveu/link/select";
            http1.open("POST", url, true);
            http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http1.onreadystatechange = function() {       //Call a function when the state changes.
                if(http1.readyState === 4 && http1.status === 200) {
                    $('#id-message1-faveu').css("display", "none");
                    $('#id-message2-faveu').css("display", "none");
                    $('#id-table-faveu').css("display", "none");
                    $('#id-landing-submit-btn').css("display", "none");
                    $('#id-message3-faveu').css("display", "none");
                    $('#id-message-thank-faveu').css("display", "block");
                } else if (http1.readyState === 4 && http1.status === 404) {
                    $('#id-message1-faveu').css("display", "none");
                    $('#id-message2-faveu').css("display", "none");
                    $('#id-table-faveu').css("display", "none");
                    $('#id-landing-submit-btn').css("display", "none");
                    $('#id-message3-faveu').css("display", "none");
                    $('#id-message-nomoreselection-faveu').css("display", "block");
                } 
            }
            http1.send(data);
        } else {                  // Try again
            document.getElementById('id-landing-btn').value = 'SUBMIT';
            selected_value0 = "";
            selected_value1 = "";
        }
    }
});
