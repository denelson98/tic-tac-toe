const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
  gameController.start();
});
const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', () => {
  gameController.rerender();
});


// factory
const createPlayer = (name, marker) => {
  return {
    name,
    marker
  }
}