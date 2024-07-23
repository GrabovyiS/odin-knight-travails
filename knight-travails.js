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
    this.buildGraph(1);
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
}

function knightMoves(coords) {}

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

console.log(getPossibleMoves([0, 0]));
let knightTravails = new KnightTravails([0, 0]);
console.log(knightTravails.root);
console.log(knightTravails.root.possibleMoves);
