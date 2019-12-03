import React from "react";
import { TextInput as T, TextInputProps } from "react-native";

export class TextInput extends React.PureComponent<TextInputProps> {
  render() {
    return <T {...this.props}>{this.props.children}</T>;
  }
}
