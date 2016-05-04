import React from 'react';

class PlayerBatComponent extends React.Component {
  batStyle() {
    let baseStyle = {
      height: "20px",
      width: "4px",
      backgroundColor: "#000",
      position: "relative",
      top: "250px"
    };

    if (this.props.left) {
      baseStyle.left = "4px";
    }

    if (this.props.right) {
      baseStyle.right = "496px";
    }

    return baseStyle;
  }

  render() {
    return (
      <div style={this.batStyle()}></div>
    );
  }
}

export default PlayerBatComponent;
