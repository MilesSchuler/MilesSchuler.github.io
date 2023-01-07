BONEMEAL_PER_MOSS_WITH_TALL_GRASS = 0.1146875
BONEMEAL_PER_MOSS_WITHOUT_TALL_GRASS = 0.1133482143
corner_buttons = ["mb-00", "mb-06", "mb-60", "mb-66"]

window.onload = () => {
    for (i = 0; i < 7; i++) {
        let buttonholder = document.createElement("div");
        buttonholder.className = "button-group";
        for (j = 0; j < 7; j++) {
            let b = document.createElement("button");
            b.className = "moss-button";
            b.id = "mb-" + i + j
            b.name = "off"
            if (!corner_buttons.includes(b.id)) {
                b.addEventListener("click", (e) => {
                    if (e.target.name == "off") {
                        $("#" + e.target.id).css("backgroundColor", "#00ce15")
                        e.target.name = "on"
                    } else {
                        $("#" + e.target.id).css("backgroundColor", "#9d9d9d")
                        e.target.name = "off"
                    }
                });
            }
            buttonholder.appendChild(b);
        }
        box = document.getElementById("text-center");
        box.appendChild(buttonholder);

        newline = document.createElement("br");
        box.appendChild(newline);
    }
}

document.onclick = function(event) {
    total = 0
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            b = document.getElementById("mb-" + i + j)
            if (b.name == "on") {
                total++
            }
        }
    }
    document.getElementById("bonemeal_calc").textContent = "Bonemeal Per Cycle: " + total * bonemeal_per_moss()
};

function all_moss_on() {
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            id = "mb-" + i + j
            button = document.getElementById(id)
            if (!corner_buttons.includes(id)) {
                button.name = "on"
                $("#" + id).css("backgroundColor", "#00ce15")
            }
        }
    }
}

function three_by_three_on() {
    reset_moss()
    for (i = 2; i < 5; i++) {
        for (j = 2; j < 5; j++) {
            id = "mb-" + i + j;
            button = document.getElementById(id);
            button.name = "on";
            $("#" + id).css("backgroundColor", "#00ce15");
        }
    }
}

function five_by_five_on() {
    reset_moss()
    for (i = 1; i < 6; i++) {
        for (j = 1; j < 6; j++) {
            id = "mb-" + i + j;
            button = document.getElementById(id);
            button.name = "on";
            $("#" + id).css("backgroundColor", "#00ce15");
        }
    }
}

function reset_moss() {
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            id = "mb-" + i + j;
            button = document.getElementById(id);
            button.name = "off";
            $("#" + id).css("backgroundColor", "#9d9d9d");
        }
    }
}

function bonemeal_per_moss() {
    if (document.getElementById("use-tall-grass").checked) {
        return BONEMEAL_PER_MOSS_WITH_TALL_GRASS;
    } else {
        return BONEMEAL_PER_MOSS_WITHOUT_TALL_GRASS;
    }
}