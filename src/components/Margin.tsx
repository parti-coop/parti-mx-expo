import React from "react";
import { ViewProps, View as V } from "react-native";

export const Margin10: React.FunctionComponent<ViewProps> = props => (
  <V {...props} style={[{ marginRight: 10 }, props.style]} />
);
