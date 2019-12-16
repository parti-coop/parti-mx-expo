import React from "react";
import { View as V, ViewProps } from "react-native";

export class View extends React.PureComponent<ViewProps> {
  render() {
    return <V {...this.props}>{this.props.children}</V>;
  }
}

export class ViewRow extends React.PureComponent<ViewProps> {
  render() {
    return (
      <V
        {...this.props}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          ...(this.props.style as Object)
        }}
      >
        {this.props.children}
      </V>
    );
  }
}

export class ViewColumnCenter extends React.PureComponent<ViewProps> {
  render() {
    return (
      <V
        {...this.props}
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ...(this.props.style as Object)
        }}
      >
        {this.props.children}
      </V>
    );
  }
}
