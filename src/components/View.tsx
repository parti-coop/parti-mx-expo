import React from "react";
import { View as V, ViewProps } from "react-native";

export class View extends React.PureComponent<ViewProps> {
  render() {
    return <V {...this.props}>{this.props.children}</V>;
  }
}
