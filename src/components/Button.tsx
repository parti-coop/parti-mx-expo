import React from "react";
import { Button as B, ButtonProps } from "react-native";

export class Button extends React.PureComponent<ButtonProps> {
  render() {
    return <B {...this.props}>{this.props.children}</B>;
  }
}
