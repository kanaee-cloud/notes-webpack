class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
            <h1>Notes App</h1>
        `;
  }
}
customElements.define("app-header", AppHeader);
