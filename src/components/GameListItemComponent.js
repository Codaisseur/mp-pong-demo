import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import ListItem from 'material-ui/lib/lists/list-item';

const winnerIconStyle = {
  color: "#FFD54F"
};

const drawIconStyle = {
  color: "#90CAF9"
};

const loserIconStyle = {
  color: "#EC407A"
};

const defaultIconStyle = {
  color: "#3F51B5"
};

class GameListItemComponent extends React.Component {
  selectGame() {
    this.props.onClick(this.props.game);
  }

  gameOpen() {
    return !this.gameFinished() &&
      this.props.game.winner === null &&
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === null ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameAlreadyJoined() {
    return !this.gameFinished() &&
      this.props.game.winner === null &&
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameFull() {
    return !this.gameOpen();
  }

  gameFinished() {
    return this.props.game.winner !== null;
  }

  playerOrYou(player) {
    if (player === this.props.currentPlayer) {
      return "You";
    }
    return player;
  }

  theWinner() {
    if (this.gameFinished()) {
      if (this.props.game.winner === "draw") {
        return `Draw between ${this.playerOrYou(this.props.game.playerOne)} and ${this.playerOrYou(this.props.game.playerTwo)}`;
      }
      return `${this.playerOrYou(this.props.game.winner)} won`;
    } else {
      return "Nobody";
    }
  }

  rightIcon() {
    if (this.playerOrYou(this.props.game.winner) === "You") {
      return (<i className="material-icons" style={winnerIconStyle}>star</i>);
    }

    if (this.props.game.winner === "draw") {
      return (<i className="material-icons" style={drawIconStyle}>thumbs_up_down</i>);
    }

    if (this.gameOpen()) {
      return (<i className="material-icons" style={defaultIconStyle}>videogame_asset</i>);
    }
  }

  render() {
    return (
      <ListItem onClick={this.selectGame.bind(this)} rightIcon={this.rightIcon()}>
        Game by {this.props.game.playerOne}

        { this.gameOpen() && !this.gameAlreadyJoined() &&
          <FlatButton onClick={this.selectGame.bind(this)} label="Join" primary={true} /> }

        { this.gameOpen() && this.gameAlreadyJoined() &&
          <FlatButton onClick={this.selectGame.bind(this)} label="Resume" secondary={true} /> }

        { !this.gameFinished() && this.gameFull() &&
          <FlatButton onClick={this.selectGame.bind(this)} label="Full" disabled={true} /> }

        { this.gameFinished() &&
          <FlatButton onClick={this.selectGame.bind(this)} label={this.theWinner()} disabled={true} /> }
      </ListItem>
    );
  }
}

export default GameListItemComponent;
