import { ApiClient } from "./api-client.js";

const apiClient = new ApiClient("https://notes-api.dicoding.dev/v2");

export const NotesAPI = {
  async getAllNotes() {
    const result = await apiClient.get("/notes");
    return result.data;
  },

  async createNote(note) {
    return apiClient.post("/notes", note);
  },

  async toggleArchiveNote(id) {
    return apiClient.post(`/notes/${id}/archive`);
  },

  async deleteNote(id) {
    return apiClient.delete(`/notes/${id}`);
  },
};
