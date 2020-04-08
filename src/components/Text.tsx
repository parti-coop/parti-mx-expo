import React from "react";
import { Text as T, TextProps, Platform } from "react-native";
import { getRandomColor } from "../Utils/RandomColorGenerator";
function lineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return Math.floor(fontSize + fontSize * multiplier);
}
export const Text: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 14,
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(14),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Mint13: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 13,
        color: "#30ad9f",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(13),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Mint14: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 14,
        color: "#30ad9f",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(14),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Mint15: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 15,
        color: "#30ad9f",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(15),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Mint16: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#30ad9f",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(16),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);
export const Mint17: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 17,
        color: "#30ad9f",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(17),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);
export const Mint24: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 24,
        color: "#30ad9f",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(24),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Grey12: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 12,
        color: "#909090",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(12),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Red12: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 12,
        color: "#f35f5f",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(12),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Red16: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#f35f5f",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(16),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Title14: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 14,
        color: "#333333",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(14),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Title15: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 15,
        color: "#333333",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(15),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Title16: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#333333",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(16),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Title18: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 18,
        color: "#333333",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(18),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Title22: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 22,
        color: "#333333",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(22),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Title24: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 24,
        color: "#333333",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(24),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Title30: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 30,
        color: "#333333",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(30),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Body15: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 15,
        color: "#555555",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(15),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Body16: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#555555",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(16),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Caption16: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#444444",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(16),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Sub15: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 15,
        color: "#777777",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(15),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Sub16: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#777777",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(16),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Blue16: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#4b93dc",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(16),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const White16: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 16,
        color: "#ffffff",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(16),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);

export const Purple12: React.FunctionComponent<TextProps> = (props) => (
  <T
    {...props}
    style={[
      {
        fontFamily: "notosans",
        fontSize: 12,
        color: "#cb6794",
      },
      Platform.select({
        android: {
          // lineHeight: lineHeight(12),
          includeFontPadding: false,
        },
      }),
      props.style,
    ]}
  >
    {props.children}
  </T>
);
