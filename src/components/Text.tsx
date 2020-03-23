import React from "react";
import { getRandomColor } from "../Utils/RandomColorGenerator";
import { Text as T, TextProps } from "react-native";

export class Text extends React.PureComponent<TextProps> {
  render() {
    return (
      <T
        {...this.props}
        style={[
          {
            fontFamily: "notosans",
            fontSize: 20
          },
          this.props.style
        ]}
      >
        {this.props.children}
      </T>
    );
  }
}

export class TextRound extends React.PureComponent<TextProps> {
  render() {
    return (
      <T
        {...this.props}
        style={[
          {
            fontFamily: "notosans",
            width: 56,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#03A9F4",
            borderRadius: 30,
            elevation: 8,
            textAlign: "center",
            textAlignVertical: "center"
          },
          this.props.style
        ]}
      >
        {this.props.children}
      </T>
    );
  }
}

export class Text2 extends React.PureComponent<TextProps> {
  render() {
    return (
      <T
        {...this.props}
        style={[
          {
            fontFamily: "notosans",
            fontSize: 20,
            flex: 1,
            backgroundColor: getRandomColor()
          },
          this.props.style
        ]}
      >
        {this.props.children}
      </T>
    );
  }
}
