interface slipInterface {
    id: number,
    advice: string,
}

async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
    const { slip } = await res.json();
    return slip;
}

async function placeAdvice() {
    const adviceSlip:slipInterface = await getAdvice();
    const adviceId = document.querySelector("#advice_id");
    const adviceContent = document.querySelector("#advice_content");
    adviceId.textContent = "#" + adviceSlip.id;
    adviceContent.textContent = `"${adviceSlip.advice}"`;
}

function switchState(dice:HTMLElement) {
    dice.classList.toggle("dicebutton-standby");
    dice.classList.toggle("dicebutton-fetching");
}

async function activateDice() {
    const diceButton:HTMLElement = document.querySelector("#diceButton");
    switchState(diceButton);
    await placeAdvice();
    switchState(diceButton);
}

function addHoverState() {
    const diceButton:HTMLElement = document.querySelector("#diceButton");
    diceButton.addEventListener("mouseenter", (e) => {
        diceButton.classList.toggle("dicebutton-hover");
    })
    diceButton.addEventListener("mouseleave", (e) => {
        diceButton.classList.toggle("dicebutton-hover");
    })
}

placeAdvice();
addHoverState();