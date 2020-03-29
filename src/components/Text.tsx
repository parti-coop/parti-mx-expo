import React from "react";
import { getRandomColor } from "../Utils/RandomColorGenerator";
import { Text as T, TextProps } from "react-native";

export const Text: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 14
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);

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
            fontSize: 14,
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

export const Mint13: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 13,
        color: "#30ad9f"
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);

export const Mint14: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 14,
        color: "#30ad9f"
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);
export const Mint17: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 14,
        color: "#30ad9f"
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);

export const Grey12: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 12,
        color: "#909090"
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);

export const Red12: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 12,
        color: "#f35f5f"
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);

export const Red16: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#f35f5f"
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);

export const Black14: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 14,
        color: "#333333"
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);

export const Body16: React.FunctionComponent<TextProps> = props => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 14,
        color: "#555555"
      },
      props.style
    ]}
  >
    {props.children}
  </T>
);
