import BaseModel from './BaseModel';

class GameModel extends BaseModel {
  defaults() {
    return {
      playerOne: null,
      playerTwo: null,
      playerOneBat: {
        position: {
          x: 250,
          y: 0
        }
      },
      playerTwoBat: {
        position: {
          x: 250,
          y: 0
        }
      },
      ball: {
        position: {
          x: 250,
          y: 250
        },
        deltaX: 0,
        deltaY: 15
      },
      winner: null
    };
  }

  constructor() {
    super('pong-game');
  }
}

export default GameModel;
