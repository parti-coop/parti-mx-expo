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

export class ViewRowLeft extends React.PureComponent<ViewProps> {
  render() {
    return (
      <V
        {...this.props}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
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

export class ViewRound extends React.PureComponent<ViewProps> {
  render() {
    return (
      <V
        {...this.props}
        style={{
          width: 56,
          height: 56,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#03A9F4",
          borderRadius: 30,
          elevation: 8,
          ...(this.props.style as Object)
        }}
      >
        {this.props.children}
      </V>
    );
  }
}
