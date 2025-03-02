import { NotesAPI } from "../services/api.js";
import Swal from "sweetalert2";

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    this.innerHTML = `
            <form id="noteForm">
                <div class="form-group">
                    <label for="title">Judul</label>
                    <input type="text" id="title" required>
                </div>
                <div class="form-group">
                    <label for="body">Catatan</label>
                    <textarea id="body" required></textarea>
                </div>
                <button type="submit">Tambah Catatan</button>
            </form>
        `;
  }

  attachEvents() {
    this.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = this.querySelector("#title").value;
      const body = this.querySelector("#body").value;

      const newNote = {
        title,
        body,
      };

      try {
        const result = await NotesAPI.createNote(newNote);
        if (result.status === "success") {
          this.dispatchEvent(
            new CustomEvent("note-added", {
              bubbles: true,
              detail: result.data,
            }),
          );
          e.target.reset();
          Swal.fire({
            title: "Success!",
            text: "Notes berhasil ditambahkan",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Ada masalah saat proses post",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  }
}

customElements.define("note-form", NoteForm);
