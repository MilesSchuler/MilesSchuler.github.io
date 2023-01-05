var db; 
var app;
var judge_count = 0
var cooldown = false;

window.onload = () => {
    initDatabase();
    refresh();
}

$(".choice").on("click", e => {
    if (!cooldown) {
        judge_count++
        refresh(parseInt(e.target.id));
        insert($("#data").html(), parseInt(e.target.id));
    }
})
window.addEventListener("keypress", e => {
    if (e.key == "1" || e.key == "2" || e.key == "3") {
        if (!cooldown) {
            judge_count++
            refresh((parseInt(e.key) - 2) * -1);
            insert($("#data").html(), (parseInt(e.key) - 2) * -1);
        }
    }
});

function refresh(id) {
    $("#header").html("Based or Cringe: " + judge_count)
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
    db.collection("items").doc(key.hashCode()).set({
        key: key.toLowerCase(),
        value: value
    });
}

String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }