import React from "react";
import { getRandomColor } from "../Utils/RandomColorGenerator";
import { TouchableOpacity as TO, TouchableOpacityProps } from "react-native";

export class TouchableOpacity extends React.PureComponent<
  TouchableOpacityProps
> {
  render() {
    return <TO {...this.props}>{this.props.children}</TO>;
  }
}

export class ButtonRound extends React.PureComponent<TouchableOpacityProps> {
  render() {
    return (
      <TouchableOpacity
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
      </TouchableOpacity>
    );
  }
}

export class TOEasy extends React.PureComponent<TouchableOpacityProps> {
  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          ...(this.props.style as Object)
        }}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export const TOCenter: React.FunctionComponent<TouchableOpacityProps> = props => (
  <TO
    {...props}
    style={[
      {
        alignItems: "center",
        justifyContent: "center"
      },
      props.style
    ]}
  >
    {props.children}
  </TO>
);

export const TORow: React.FunctionComponent<TouchableOpacityProps> = props => (
  <TO
    {...props}
    style={[
      {
        flexDirection: "row",
        alignItems: "center"
      },
      props.style
    ]}
  >
    {props.children}
  </TO>
);

export const TORowCenter: React.FunctionComponent<TouchableOpacityProps> = props => (
  <TO
    {...props}
    style={[
      {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      },
      props.style
    ]}
  >
    {props.children}
  </TO>
);
