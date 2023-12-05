const template = document.createElement("template");

template.innerHTML = `
  <style>
    .hover-button {
      background-color: #3496FF;
      color: #fff;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      font-size: 18px;
      border-radius: 5px;
      position: absolute;
      z-index: 9999;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .transitions-enabled {
      transition: all 0.3s ease;
    }

    .hover-button.clicked {
      background-color: #f1c40f;
      transition: all 0.3s ease;
    }

    .hover-button.hidden {
      display: none;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes rainbow {
      0% { color: red; }
      14% { color: orange; }
      28% { color: yellow; }
      42% { color: green; }
      56% { color: blue; }
      70% { color: indigo; }
      84% { color: violet; }
      100% { color: red; }
    }

    .rainbow-text {
      animation: rainbow 2s linear infinite;
    }
  </style>
  <button class="hover-button">Click me</button>
`;

class HoverButton extends HTMLElement {
  constructor() {
    super();

    const tempNode = template.content.cloneNode(true);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(tempNode);

    this._button = this._shadowRoot.querySelector(".hover-button");
    this._currentTextIndex = 0;
    this._textArray = [
      "Too slow",
      "Try again",
      "You can do it",
      "I believe in you",
      "You're almost there",
      "Keep going",
      "Okay okay",
      "I'll make it easier",
      "🍆",
      "👀",
      "How about this?",
      "8========================D",
      "Hmm...",
      "That sucks",
      "Wanna hear a joke instead?",
      "What's the difference between a snowman and a snowwoman?",
      "Snowballs",
      "Actually...",
      "Let's play a game of hide and seek!!",
      "*CLICK ME*",
      "Wow, you found me!",
      "I'm impressed",
      "You're pretty good at this",
      "Here, you've earned this",
      "🍪",
      "I hope you're having a good day :)",
      "Remember...",
      "Life often rewards those who...",
      "keep trying and never give up",
      "",
    ];

    this._button.addEventListener(
      "mouseenter",
      this._handleMouseEnter.bind(this)
    );
  }

  _handleIndexCases() {
    switch (this._currentTextIndex) {
      case 0: // too slow
        this.resetButton();
        this.enableTransition();
        break;
      case 1: // try again
        break;
      case 2: // you can do it
        break;
      case 3: // i believe in you
        break;
      case 4: // you're almost there
        break;
      case 5: // keep going
        break;
      case 6: // okay okay
        break;
      case 7: // i'll make it easier
        break;
      case 8: // eggplant
        this.enlargeButton();
        break;
      case 9: // eyes
        this.resetButton();
        break;
      case 10: // how about this?
        break;
      case 11: // 8========================D
        this.startSpinning();
        break;
      case 12: // hmm...
        this.resetButton();
        break;
      case 13: // that sucks
        break;
      case 14: // wanna hear a joke instead?
        break;
      case 15: // what's the difference between a snowman and a snowwoman?
        break;
      case 16: // snowballs
        this.startRainbowEffect();
        break;
      case 17: // actually...
        this.resetButton();
        break;
      case 18: // let's play a game of hide and seek!!
        break;
      case 19: // *click me*
        this.disableTransition();
        this.fillScreenWithFakeButtons();
        break;
      case 20: // wow, you found me!
        this.enableTransition();
        this.removeAllFakeButtons();
        break;
      case 21: // i'm impressed
        break;
      case 22: // you're pretty good at this
        break;
      case 23: // here, you've earned this
        break;
      case 24: // cookie
        this.enlargeButton();
        break;
      case 25: // i hope you're having a good day :)
        this.resetButton();
        break;
      case 26: // remember...
        break;
      case 27: // life often rewards those who...
        break;
      case 28: // keep searching and never give up
        break;
      case 29: //
        break;
      default:
        break;
    }
  }

  // main loop
  _handleMouseEnter() {
    if (this._currentTextIndex < this._textArray.length) {
      this._disableHoverTemporarily();
      this._moveButtonRandomly();
      this._button.textContent = this._textArray[this._currentTextIndex];
      this._handleIndexCases();
      this._currentTextIndex++;

      if (this._currentTextIndex === this._textArray.length) {
        this._button.classList.add("hidden");
      }
    }

    // debugging
    console.log(
      "Current Index:",
      this._currentTextIndex + " ----- Text: " + this._button.textContent
    );
  }

  // random movement
  _moveButtonRandomly() {
    const maxX = window.innerWidth - this._button.offsetWidth;
    const maxY = window.innerHeight - this._button.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    this._button.style.position = "absolute";
    this._button.style.left = `${newX}px`;
    this._button.style.top = `${newY}px`;
  }

  static get observedAttributes() {
    return [];
  }

  // disable hover for a short period of time
  _disableHoverTemporarily() {
    this._button.style.pointerEvents = "none";

    setTimeout(() => {
      this._button.style.pointerEvents = "auto";
    }, 300);
  }

  // reset button
  resetButton() {
    this._button.style.transform = "scale(1)";
    this._button.style.fontSize = "18px";
    this._button.style.padding = "10px 20px";
    this._button.classList.remove("spinning");
    this._button.classList.remove("rainbow-text");
    this._button.style.translate = "none";
  }

  // fun functions
  enlargeButton() {
    this._button.style.transform = "scale(2.5)";
    this._button.style.fontSize = "44px";
    this._button.style.padding = "15px 25px";
  }

  startSpinning() {
    this._button.classList.add("spinning");
  }

  startRainbowEffect() {
    this._button.classList.add("rainbow-text");
  }

  disableTransition() {
    this._button.classList.remove("transitions-enabled");
  }

  enableTransition() {
    this._button.classList.add("transitions-enabled");
  }

  fillScreenWithFakeButtons() {
    this._shadowRoot
      .querySelectorAll(".fake-button")
      .forEach((btn) => btn.remove());

    const numberOfButtons =
      Math.floor(window.innerWidth / 100) * Math.floor(window.innerHeight / 50);

    for (let i = 0; i < numberOfButtons; i++) {
      const fakeButton = document.createElement("button");
      fakeButton.textContent = "Click me";
      fakeButton.className = "fake-button";
      fakeButton.style.position = "absolute";
      fakeButton.style.left = `${Math.random() * window.innerWidth}px`;
      fakeButton.style.top = `${Math.random() * window.innerHeight}px`;
      fakeButton.style.background = "#3496FF"; // old: #3498db
      fakeButton.style.color = "#fff";
      fakeButton.style.border = "none";
      fakeButton.style.padding = "10px 20px";
      fakeButton.style.borderRadius = "5px";
      fakeButton.style.fontSize = "18px";

      this._shadowRoot.appendChild(fakeButton);
    }

    this._moveButtonRandomly();
  }

  removeAllFakeButtons() {
    this._shadowRoot
      .querySelectorAll(".fake-button")
      .forEach((btn) => btn.remove());
  }

  // boring functions
  attributeChangedCallback(name, oldValue, newValue) {}

  connectedCallback() {}

  disconnectedCallback() {}
}

customElements.define("hover-button", HoverButton);
