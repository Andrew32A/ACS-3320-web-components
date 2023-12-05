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

    .hover-button:hover {
      background-color: #e74c3c;
      transition: all 0.3s ease;
    }

    .hover-button.clicked {
      background-color: #f1c40f;
      transition: all 0.3s ease;
    }

    .hover-button.hidden {
      display: none;
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
      "🍆🍆🍆🍆🍆🍆",
      "",
    ];

    this._button.addEventListener(
      "mouseenter",
      this._handleMouseEnter.bind(this)
    );
  }

  _handleIndexCases() {
    switch (this._currentTextIndex) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        this.enlargeButton();
        break;
      case 9:
        this.resetButtonSize();
        break;
      case 10:
        break;
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

  enlargeButton() {
    this._button.style.transform = "scale(2.5)";
    this._button.style.fontSize = "44px";
    this._button.style.padding = "15px 25px";
  }

  resetButtonSize() {
    this._button.style.transform = "scale(1)";
    this._button.style.fontSize = "18px";
    this._button.style.padding = "10px 20px";
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  connectedCallback() {}

  disconnectedCallback() {}
}

customElements.define("hover-button", HoverButton);
