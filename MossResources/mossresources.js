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

function allMossOn() {
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

function resetMoss() {
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            id = "mb-" + i + j
            button = document.getElementById(id)
            button.name = "off"
            $("#" + id).css("backgroundColor", "#9d9d9d")
        }
    }
}

