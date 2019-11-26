import React from "react";
import { Text as T, TextProps } from "react-native";

export class Text extends React.PureComponent<TextProps> {
  render() {
    return (
      <T
        {...this.props}
        style={{ fontFamily: "sans-serif", ...(this.props.style as Object) }}
      >
        {this.props.children}
      </T>
    );
  }
}
