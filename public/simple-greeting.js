import { css, html, LitElement } from "npm:lit";

export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  static properties = {
    name: {type: String},
  };

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    const time = new Date().toLocaleTimeString();
    return html`<p>The time is ${time}</p>`;
  }
}

customElements.define('simple-greeting', SimpleGreeting);