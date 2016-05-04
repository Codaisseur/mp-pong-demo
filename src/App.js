import React from 'react';
import GameModel from './models/GameModel';
import NewPlayerComponent from './components/NewPlayerComponent';
import NewGameComponent from './components/NewGameComponent';
import GameListComponent from './components/GameListComponent';
import PongGameComponent from './components/PongGameComponent';
import PlayerBatComponent from './components/PlayerBatComponent';
import Utils from './lib/Utils';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from './lib/Theme';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

const buttonStyle = {
  margin: 12,
};

const containerStyles = {
  width: '80%',
  height: "auto",
  margin: "auto",
};

const paperStyle = {
  margin: 20,
  padding: 40
};

const headerStyle = {
  textAlign: "center",
  fontFamily: 'Roboto'
};

const playerMoveContainerStyle = {
  textAlign: "center"
};

const playerMoveStyle = {
  textAlign: "center",
  fontFamily: "Roboto",
  fontSize: "6em",
  color: "#999"
};

class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));
    this.utils = new Utils();

    let playerStorage = this.utils.store("rockpaperscissors.player");
    if (playerStorage.length === 0) {
      playerStorage = null;
    }

    this.state = {
      games: [],
      currentGame: null,
      currentPlayer: playerStorage
    };
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    };
  }

  updateList() {
    this.setState({
      games: this.games.resources
    });

    if (this.state.currentGame !== null) {
      let component = this;
      this.games.resources.map(function(game) {
        if (game._id === component.state.currentGame._id) {
          component.setState({
            currentGame: game
          });
          if (game.winner === null) {
            // component.determineWinner();
          }
        }
      });
    }
  }

  setPlayer(player) {
    this.setState({
      currentPlayer: player
    });
    this.utils.store("rockpaperscissors.player", player);
  }

  createGame() {
    this.games.addResource({
      playerOne: this.state.currentPlayer
    });
  }

  joinGame(game) {
    console.log("Joining game...");
    if (game.playerOne === this.state.currentPlayer || game.playerTwo === this.state.currentPlayer || game.playerTwo === null) {
      if (game.playerOne !== this.state.currentPlayer && game.playerTwo !== this.state.currentPlayer) {
        console.log("Joining game as player two...");
        this.games.save(game, { playerTwo: this.state.currentPlayer });
      }

      this.setState({
        currentGame: game
      });
    } else {
      window.alert("Can't touch this dung dung dung dung");
    }
  }

  clearCurrentGame() {
    this.setState({
      currentGame: null
    });
  }

  saveGame(game, props) {
    this.games.save(game, props);
  }

  render() {
    return (
      <div>
        <AppBar title="P0ngz0rz" titleStyle={{ textAlign: 'center' }}/>
        <div style={containerStyles}>
          { this.state.currentPlayer !== null &&
            <h1 style={headerStyle}>Hi, {this.state.currentPlayer}</h1> }

          { this.state.currentPlayer === null &&
            <NewPlayerComponent onCreate={this.setPlayer.bind(this)}/> }

          { this.state.currentGame === null && this.state.currentPlayer !== null &&
            <GameListComponent games={this.state.games} currentPlayer={this.state.currentPlayer} onSelect={this.joinGame.bind(this)}/> }

          { this.state.currentPlayer && this.state.currentGame === null &&
            <NewGameComponent onCreate={this.createGame.bind(this)}/> }

          { this.state.currentGame !== null &&
            <PongGameComponent game={this.state.currentGame} player={this.state.currentPlayer} onChange={this.saveGame.bind(this)}/> }
        </div>
      </div>);
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default App;
