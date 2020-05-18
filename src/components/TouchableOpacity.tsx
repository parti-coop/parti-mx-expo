import React from "react";
import { getRandomColor } from "../Utils/RandomColorGenerator";
import {
  TouchableOpacity as TO,
  TouchableOpacityProps,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";

export const TWF0: React.FunctionComponent<TouchableWithoutFeedbackProps> = (
  props
) => (
  <TouchableWithoutFeedback
    {...props}
    style={[
      {
        alignItems: "center",
        justifyContent: "center",
      },
      props.style,
    ]}
  >
    {props.children}
  </TouchableWithoutFeedback>
);

export const TouchableOpacity: React.FunctionComponent<TouchableOpacityProps> = (
  props
) => <TO {...props}>{props.children}</TO>;

export const TO1: React.FunctionComponent<TouchableOpacityProps> = (props) => (
  <TO
    {...props}
    style={[
      {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      props.style,
    ]}
  >
    {props.children}
  </TO>
);
export const TO0: React.FunctionComponent<TouchableOpacityProps> = (props) => (
  <TO
    {...props}
    style={[
      {
        alignItems: "center",
        justifyContent: "center",
      },
      props.style,
    ]}
  >
    {props.children}
  </TO>
);
// : React.FunctionComponent<TouchableOpacityProps>
export const TOCenter = React.forwardRef<
  TO,
  TouchableOpacityProps & { children: React.ReactNode }
>((props, ref) => (
  <TO
    {...props}
    ref={ref}
    style={[
      {
        alignItems: "center",
        justifyContent: "center",
      },
      props.style,
    ]}
  >
    {props.children}
  </TO>
));

export const TORow: React.FunctionComponent<TouchableOpacityProps> = (
  props
) => (
  <TO
    {...props}
    style={[
      {
        flexDirection: "row",
        alignItems: "center",
      },
      props.style,
    ]}
  >
    {props.children}
  </TO>
);

export const TORowCenter: React.FunctionComponent<TouchableOpacityProps> = (
  props
) => (
  <TO
    {...props}
    style={[
      {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      props.style,
    ]}
  >
    {props.children}
  </TO>
);
