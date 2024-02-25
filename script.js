const gamboard = (function () {
    let board = 
    [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    return {board};
  })();

  function Player(name, marker) {
    return { name, marker };
  }

  const playerOne = Player('one', 'X')
  const playerTwo = Player('two' ,'O');

  const displayBoard = (function () {

    return {};
  })();