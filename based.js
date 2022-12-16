var db; 
var app;

var cooldown = false;

window.onload = () => {
    initDatabase();
    refresh();
}

$(".choice").on("click", e => {
    if (!cooldown) {
        refresh(parseInt(e.target.id));
        insert($("#data").html(), parseInt(e.target.id));
    }
})
window.addEventListener("keypress", e => {
    if (e.key == "1" || e.key == "2" || e.key == "3") {
        if (!cooldown) {
            refresh((parseInt(e.key) - 2) * -1);
            insert($("#data").html(), (parseInt(e.key) - 2) * -1);
        }/* else {
            $("#-1").css("border","3px solid red");
            $("#0").css("border","3px solid red");
            $("#1" + e.key).css("border","3px solid red");
        }*/
    }
});

function refresh(id) {
    cooldown = true;
    $("#" + id).css("border","3px solid yellow");
    $.ajax({url: "https://en.wikipedia.org/api/rest_v1/page/random/summary"}).done(res => {
        window.setTimeout(() => {
            $("#data").html(res.title);
            console.log(res);
            $("#data").attr("href", res.content_urls.desktop.page);

            $("#-1").css("border","3px solid black");
            $("#0").css("border","3px solid black");
            $("#1").css("border","3px solid black");
            // use natural language processing to get first sentence
            $("#info").html(nlp(res.extract).json().map(o=> o.text)[0].toString());
            cooldown = false;
        }, 1000);
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