const displayProgressBar = () => {
  const progressBar = document.getElementById("progressBar");
  progressBar.style.display = "block";
};

const hideProgressBar = () => {
  const progressBar = document.getElementById("progressBar");
  progressBar.style.display = "none";
};

export { displayProgressBar, hideProgressBar };
