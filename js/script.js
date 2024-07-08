const keys = [
  ["a", "ai"],
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"],
];

function encrypt(text, keys) {
  return text
    .split("")
    .map((item) =>
      keys.reduce((prev, act) => (prev === act[0] ? act[1] : prev), item)
    )
    .join("");
}

function decrypt(textEncrypt, keys) {
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
  const position = document.querySelector(".second-section-result").getBoundingClientRect();
  window.scrollTo({top: position.y, left: position.x, behavior:"smooth"});
}

function resetResult() {
  document
    .querySelector(".second-section-not-found")
    .classList.remove("invisible");

  document.querySelector(".second-section-result").classList.add("invisible");

  document.querySelector(".second-section-result__text").innerHTML = "";
}

document.querySelector("#crypt").addEventListener("click", (_) => {
  const text = document.querySelector("#text-input").value.trim();
  if (!text) {
    resetResult();
    return;
  }
  showResult(encrypt(text, keys));
});

document.querySelector("#decrypt").addEventListener("click", (_) => {
    const text = document.querySelector("#text-input").value.trim();
  if (!text) {
    resetResult();
    return;

  }
  showResult(decrypt(text, keys));
});

document.querySelector("#copy").addEventListener("click", async (e) => {
  try {
    const text = document.querySelector(
      ".second-section-result__text"
    ).textContent;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      e.target.innerHTML = "Copiado!";
      e.target.setAttribute("disabled", true);

      setTimeout((_) => {
        e.target.innerHTML = "Copiar";
        e.target.removeAttribute("disabled");
      }, 2000);
    }
  } catch (ex) {
    console.log("The Clipboard API is not available.", ex);
  }
});
