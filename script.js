const gameboard = (function () {
    let board = 
    [
        ['X','',''],
        ['','X',''],
        ['','','X']
    ]
    return {board};
  })();

  function Player(name, marker) {
    return { name, marker };
  }

  const playerOne = Player('one', 'X')
  const playerTwo = Player('two' ,'O');

  const displayBoard = (function () {
    const display = document.querySelector('#board')
    gameboard.forEach((element) => {
        let newTile = document.createElement('div')
        display.appendChild(newTile)
    });
    return {};
  })();
