export class NoteCard extends HTMLElement {
  connectedCallback() {
    const note = JSON.parse(this.getAttribute("data"));
    this.render(note);
    this.attachEvents(note);
  }

  render(note) {
    this.innerHTML = `
            <article class="note-item">
                <h3>${note.title}</h3>
                <p class="note-body">${note.body}</p>
                <div class="note-meta">
                    ${new Date(note.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    ${note.archived ? '<span class="archive-badge">Diarsipkan</span>' : ""}
                </div>
                <div class="note-actions">
                    <button class="btn-archive" data-id="${note.id}">
                        ${note.archived ? "Aktifkan" : "Arsipkan"}
                    </button>
                    <button class="btn-delete" data-id="${note.id}">Hapus</button>
                    
                </div>
            </article>
        `;
  }

  attachEvents(note) {
    this.querySelector(".btn-archive").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("note-archived", {
          bubbles: true,
          detail: { id: note.id },
        }),
      );
    });

    this.querySelector(".btn-delete").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("note-deleted", {
          bubbles: true,
          detail: { id: note.id },
        }),
      );
    });
  }
}

customElements.define("note-card", NoteCard);
