import React from "react";
import { TextInput as T, TextInputProps } from "react-native";

export const TextInput = React.forwardRef<T, TextInputProps>(
  (props, ref: React.Ref<T>) => (
    <T {...props} ref={ref}>
      {props.children}
    </T>
  )
);
