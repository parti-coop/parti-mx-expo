import React from "react";
import { View as V, ViewProps } from "react-native";

export const View: React.FunctionComponent<ViewProps> = props => (
  <V {...props}>{props.children}</V>
);
export const ViewRow: React.FunctionComponent<ViewProps> = props => (
  <V
    {...props}
    style={[
      {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "wrap"
      },
      props.style
    ]}
  >
    {props.children}
  </V>
);
export const ViewRowCenter: React.FunctionComponent<ViewProps> = props => (
  <V
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
  </V>
);
export const ViewColumnCenter: React.FunctionComponent<ViewProps> = props => (
  <V
    {...props}
    style={[
      {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      },
      props.style
    ]}
  >
    {props.children}
  </V>
);
export const ViewColumnStretch: React.FunctionComponent<ViewProps> = props => (
  <V
    {...props}
    style={[
      {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center"
      },
      props.style
    ]}
  >
    {props.children}
  </V>
);

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
