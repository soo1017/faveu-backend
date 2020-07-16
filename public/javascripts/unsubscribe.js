
$(document).on("click", ".cls-unsub-btn", function(e) {
    e.preventDefault();

    var unsub_email = $('#id-unsub-email').text();
    var unsub_data = {};

    if (unsub_email) {
        unsub_data.unsub_email = unsub_email;
        var unsub_url = "https://www.faveu.com/unsubscribe/confirm";
        $.ajax({
                url: unsub_url,
                type: 'post',
                dataType:'json',
                data: unsub_data
        }).then(function(data, textStatus, jqXHR) {
            if (jqXHR.status === 200) {
                $('.cls-beforemessage-unsub-faveu').attr('style', 'display:none;');
                $('.cls-aftermessage-unsub-faveu').attr('style', 'display:block;');
                $('.cls-sorrymessage-unsub-faveu').attr('style', 'display:none;');
            } else if (jqXHR.status === 404 && jqXHR.responseText === "Already unsubscribed") {
                $('.cls-beforemessage-unsub-faveu').attr('style', 'display:none;');
                $('.cls-aftermessage-unsub-faveu').attr('style', 'display:none;');
                $('.cls-sorrymessage-unsub-faveu').attr('style', 'display:block;');
            } else {
                alert("Error!");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 200) {
                $('.cls-beforemessage-unsub-faveu').attr('style', 'display:none;');
                $('.cls-aftermessage-unsub-faveu').attr('style', 'display:block;');
                $('.cls-sorrymessage-unsub-faveu').attr('style', 'display:none;');
            } else if (jqXHR.status === 404 && jqXHR.responseText === "Already unsubscribed") {
                $('.cls-beforemessage-unsub-faveu').attr('style', 'display:none;');
                $('.cls-aftermessage-unsub-faveu').attr('style', 'display:none;');
                $('.cls-sorrymessage-unsub-faveu').attr('style', 'display:block;');
            } else {
                alert("Error");
            }
        });

    } else {
        alert("Error");
    }
});
