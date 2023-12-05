const template = document.createElement("template");

template.innerHTML = `
  <style>
    .hover-button {
      background-color: #3498db;
      color: #fff;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 18px;
      border-radius: 5px;
      position: absolute;
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
      "Uh oh",
      "How about this?",
      "8========================D",
      "Hmm...",
      "That sucks",
      "Wanna hear a joke instead?",
      "What's the difference between a snowman and a snowwoman?",
      "Snowballs",
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
      case 9: // uh oh
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
      case 17: //
        this.resetButton();
      default:
        break;
    }
  }

  _handleMouseEnter() {
    if (this._currentTextIndex < this._textArray.length) {
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

  resetButton() {
    this._button.style.transform = "scale(1)";
    this._button.style.fontSize = "18px";
    this._button.style.padding = "10px 20px";
    this._button.classList.remove("spinning");
    this._button.classList.remove("rainbow-text");
  }

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

  attributeChangedCallback(name, oldValue, newValue) {}

  connectedCallback() {}

  disconnectedCallback() {}
}

customElements.define("hover-button", HoverButton);
