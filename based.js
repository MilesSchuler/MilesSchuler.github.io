refresh();
function refresh() {
    $.ajax({url: 'https://en.wikipedia.org/api/rest_v1/page/random/summary'}).done(res => {
        //let obj = JSON.parse(res);
        console.log(res);
        //console.log(obj)
        $('#data').html(res.title)
        $("#info").html(res.extract.split(". ")[0])
    });
}

