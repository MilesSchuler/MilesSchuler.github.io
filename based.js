var db; 
var app;

window.onload = () => {
    initDatabase();
    refresh();
}

$('.choice').on('click', e => {
    refresh();
    insert($('#data').html(), parseInt(e.target.id));
})
window.addEventListener("keypress", e => {
    refresh();
    if (e.key == "1" || e.key == "2" || e.key == "3") {
        insert($('#data').html(), (parseInt(e.key) - 2) * -1);
    }
});

function refresh() {
    $.ajax({url: 'https://en.wikipedia.org/api/rest_v1/page/random/summary'}).done(res => {
        $('#data').html(res.title)
        $("#info").html(res.extract.split(". ")[0])
    });
}
function initDatabase() {
    const firebaseConfig = {
        apiKey: "AIzaSyB7wEvnInVLsxdfPuPEfBQfVteR4Clce7w",
        projectId: "based-or-cringe-f022a",
        appID: "based-or-cringe-f022a"
    };

    app = firebase.initializeApp(firebaseConfig);

    db = firebase.firestore();
}
/*function readDatabase() {
    db.collection("items").get().then((res) => {
        res.forEach(item => {
            console.log(item.data());
        });
    });
}*/
function insert(key, value) {
    dbLength().then(len => {
        db.collection("items").doc(len.toString()).set({
            key: key.toLowerCase(),
            value: value
        });
    });
}
async function dbLength() {
    return await db.collection("items").get().then((res) => {
        let i = 0;
        res.forEach(item => {
            i++;
        });
        return i+1;
    });
}