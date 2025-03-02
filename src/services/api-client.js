import { showLoading, hideLoading } from "../utils/loading";

export class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetch(endpoint, options = {}) {
    showLoading();
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": "12345",
          ...options.headers,
        },
      });
      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    } finally {
      hideLoading();
    }
  }

  async get(endpoint) {
    return this.fetch(endpoint);
  }

  async post(endpoint, data) {
    return this.fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.fetch(endpoint, {
      method: "DELETE",
    });
  }
}
