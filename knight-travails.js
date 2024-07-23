class Node {
  possibleMoves = [];
  constructor(coords) {
    this.coords = coords;
  }
}

class KnightTravails {
  board = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
  ];

  constructor(rootCoords) {
    this.root = new Node(rootCoords);
    this.buildGraph(6);
  }

  buildGraph(n, currentRoot = this.root) {
    if (n === 0) {
      return;
    }

    const newPossibleMoves = getPossibleMoves(currentRoot.coords);

    newPossibleMoves.forEach((coords) => {
      const newNode = new Node(coords);
      currentRoot.possibleMoves.push(newNode);
      this.buildGraph(n - 1, newNode);
    });
  }

  searchForMove(targetCoords, currentRoot = this.root, stack = []) {
    if (
      currentRoot.coords[0] === targetCoords[0] &&
      currentRoot.coords[1] === targetCoords[1]
    ) {
      console.log(currentRoot.coords, 'Returns');
      return [currentRoot.coords];
    }

    for (const node of currentRoot.possibleMoves) {
      const coordsStack = this.searchForMove(targetCoords, node, stack);
      if (coordsStack) {
        console.log('gets up from', node.coords, 'to', currentRoot.coords);
        // We collect the stack as we go backwards in our function call stack
        // This way the root node is the first one in the stack
        coordsStack.push(currentRoot.coords);
        return coordsStack;
      }
    }

    // If the call stack is empty - we are back at the root node without getting an answer
    return false;
  }
}

function getPossibleMoves(coords) {
  const moves = [];

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (i === j || i + j === 0 || i === 0 || j === 0) {
        continue;
      }

      const newCoordX = coords[0] + i;
      const newCoordY = coords[1] + j;

      if (newCoordX > 7 || newCoordX < 0 || newCoordY > 7 || newCoordY < 0) {
        continue;
      }

      moves.push([newCoordX, newCoordY]);
    }
  }

  return moves;
}

function knightMoves(startCoords, targetCoords) {
  const knightTravails = new KnightTravails(startCoords);

  const movesStack = knightTravails.searchForMove(targetCoords);

  if (!movesStack) {
    console.log(
      'Something went wrong. Your target coordinates might have been illegal.'
    );
    return;
  }

  console.log(`You made it in ${movesStack.length} moves! Here's your path:`);
  while (movesStack.length > 0) {
    console.log(movesStack.pop());
  }
}

knightMoves([3, 3], [9, 9]);
