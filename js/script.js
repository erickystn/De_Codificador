function encrypt(text) {
    const keys = [
        ["a", "ai"],
        ["e", "enter"],
        ["i", "imes"],
        ["o", "ober"],
        ["u", "ufat"],
    ];

    return text
        .split("")
        .map((item) =>
            keys.reduce((prev, act) => (prev === act[0] ? act[1] : prev), item)
        )
        .join("");
}

function decrypt(textEncrypt) {
    const keys = [
        ["a", "ai"],
        ["e", "enter"],
        ["i", "imes"],
        ["o", "ober"],
        ["u", "ufat"],
    ];
    return keys.reduce(
        (prev, act) => prev.replaceAll(act[1], act[0]),
        textEncrypt
    );
}

function showResult(text) {
    document
        .querySelector(".second-section-not-found")
        .classList.add("invisible");

    document
        .querySelector(".second-section-result")
        .classList.remove("invisible");

    document.querySelector(".second-section-result__text").innerHTML = text;
}

function resetResult() {
    document
        .querySelector(".second-section-not-found")
        .classList.remove("invisible");

    document.querySelector(".second-section-result").classList.add("invisible");

    document.querySelector(".second-section-result__text").innerHTML = "";
}

document.querySelector("#crypt").addEventListener("click", (_) => {
    const text = document.querySelector("#text-input").value;
    if (!text) {
        resetResult();
        return;
    }
    showResult(encrypt(text));
});

document.querySelector("#decrypt").addEventListener("click", (_) => {
    const text = document.querySelector("#text-input").value;
    if (!text) {
        resetResult();
        return;
    }
    showResult(decrypt(text));
});
document.querySelector("#copy").addEventListener("click", async (e) => {
    try {

        const text = document.querySelector(".second-section-result__text").textContent;
        console.log(text)
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            e.target.value = "Copiado!"

            setTimeout(e => e.target.value = "Copiar", 1000);
        }
    } catch (ex) {
        console.log("The Clipboard API is not available.", ex);
    }
});

