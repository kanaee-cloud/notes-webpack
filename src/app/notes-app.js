import Swal from "sweetalert2";
import { NotesAPI } from "../services/api.js";
import { showLoading, hideLoading } from "../utils/loading.js";

export class NotesApp {
  constructor() {
    this.notes = [];
    this.currentFilter = "active";
    this.initializeApp();
  }

  async initializeApp() {
    showLoading();
    await this.fetchNotes();
    hideLoading();
    this.attachEvents();
    this.renderNotes();
  }

  async fetchNotes() {
    try {
      this.notes = await NotesAPI.getAllNotes();
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  attachEvents() {
    document.addEventListener("note-added", async (e) => {
      showLoading();
      this.notes.unshift(e.detail);
      hideLoading();
      this.renderNotes();
    });

    document.addEventListener("note-archived", async (e) => {
      try {
        showLoading();
        const result = await NotesAPI.toggleArchiveNote(e.detail.id);
        hideLoading();

        if (result.status === "success") {
          const note = this.notes.find((n) => n.id === e.detail.id);
          if (note) {
            note.archived = !note.archived;
            this.renderNotes();
          }
          Swal.fire({
            title: "Terarsip!",
            text: "Notes Berhasil diarsipkan",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        hideLoading();
        Swal.fire({
          title: "Error!",
          text: "Ada masalah saat arsipkan notes",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });

    document.addEventListener("note-deleted", async (e) => {
      try {
        showLoading();
        const result = await NotesAPI.deleteNote(e.detail.id);
        hideLoading();

        if (result.status === "success") {
          this.notes = this.notes.filter((note) => note.id !== e.detail.id);
          this.renderNotes();
          Swal.fire({
            title: "Dihapus!",
            text: "Notes berhasil dihapus",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        hideLoading();
        Swal.fire({
          title: "Error!",
          text: "Ada masalah saat menghapus notes",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });

    document.querySelectorAll(".btn-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.currentFilter = btn.dataset.filter;
        this.renderNotes();

        document
          .querySelectorAll(".btn-filter")
          .forEach((b) => b.classList.toggle("active", b === btn));
      });
    });
  }

  renderNotes() {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    const filteredNotes = this.notes.filter((note) =>
      this.currentFilter === "active" ? !note.archived : note.archived
    );

    filteredNotes.forEach((note) => {
      const noteCard = document.createElement("note-card");
      noteCard.setAttribute("data", JSON.stringify(note));
      notesContainer.appendChild(noteCard);
    });
  }
}