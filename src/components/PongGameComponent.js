import React from 'react';
import ReactCanvas from 'react-canvas';

const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;

const ball = require('../images/ball.png');
const bat = require('../images/bat.png');

const canvasStyle = {
  width: 500,
  height: 500,
  margin: 'auto',
  border: '1px solid #eee',
};

class PongGameComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      newPos: null
    };
    this.speed = 30;
  }

  componentDidMount() {
    this.repaint();
    this.moveBall();
  }

  moveBall() {
    if (this.state.newPos === null) {
      this.state.newPos = this.props.game.ball.position;
    }
    if (this.state.newPos === null) {
      console.log("newpos is null..");
      return;
    }

    let currentPos = this.state.newPos;
    let deltaX = this.props.game.ball.deltaX;
    let deltaY = this.props.game.ball.deltaY;
    let newX = currentPos.x + deltaX;
    let newY = currentPos.y + deltaY;

    console.log(deltaY);
    console.log(deltaX);

    if (newX >= 800 || newX <= 0) {
      newX = Math.max(currentPos.x - deltaX, 10);
      deltaX = -deltaX;
    }
    if (newY >= 500 || newY <= 0) {
      newY = Math.max(currentPos.y - deltaY, 10);
      deltaY = -deltaY;
    }

    this.setState({
      newPos: {
        x: newX,
        y: newY,
      }
    });

    if (deltaX !== this.props.game.ball.deltaX ||
        deltaY !== this.props.game.ball.deltaY) {
      console.log(deltaX);
      console.log(deltaY);
      this.props.onChange(this.props.game, {
        ball: {
          position: this.state.newPos,
          deltaX: deltaX,
          deltaY: deltaY,
        }
      });
    }

    window.setTimeout(function() {
      this.moveBall();
    }.bind(this), this.speed);
  }

  drawBall() {
    let position = this.state.newPos;
    if (position === null) {
      console.log("pos is null..");
      return;
    }
  }

  repaint() {
    this.drawBall();
    window.setTimeout(function() {
      this.repaint();
    }.bind(this), 5);
  }

  getTextStyle(surfaceHeight) {
    return {
      top: (surfaceHeight / 2),
      left: 0,
      width: window.innerWidth,
      height: 20,
      lineHeight: 20,
      fontSize: 12
    };
  }

  getBallStyle() {
    let position = this.state.newPos;

    if (position === null) {
      console.log("pos is null..");
      position = {
        x: 0,
        y: 0
      };
    }

    return {
      top: position.y,
      left: position.x,
      width: 20,
      height: 20
    };
  }

  render() {
    console.log("render!");
    let surfaceWidth = 800;
    let surfaceHeight = 500;
    let textStyle = this.getTextStyle(surfaceHeight);
    let ballStyle = this.getBallStyle();

    console.log(ball);
    return (
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
        <Image style={ballStyle} src={ball} />
        <Text style={textStyle}>
          Play Pong!
        </Text>
      </Surface>
    );
  }
}

export default PongGameComponent;
