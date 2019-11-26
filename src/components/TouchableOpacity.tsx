import React from "react";
import { TouchableOpacity as TO, TouchableOpacityProps } from "react-native";

export class TouchableOpacity extends React.PureComponent<
  TouchableOpacityProps
> {
  render() {
    return <TO {...this.props}>{this.props.children}</TO>;
  }
}
