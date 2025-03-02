export const showLoading = () => {
  let loading = document.querySelector(".loading-spinner");
  if (!loading) {
    loading = document.createElement("div");
    loading.className = "loading-spinner";
    loading.innerHTML = `
      <div class="spinner"></div>
      <p>Loading...</p>
    `;
    document.body.appendChild(loading);
  }
};

export const hideLoading = () => {
  const loading = document.querySelector(".loading-spinner");
  if (loading) {
    loading.remove();
  }
};
