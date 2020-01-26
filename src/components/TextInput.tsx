import React from "react";
import { TextInput as T, TextInputProps } from "react-native";
import { getRandomColor } from "../Utils/RandomColorGenerator";
export const TextInput = React.forwardRef<T, TextInputProps>(
  (props, ref: React.Ref<T>) => (
    <T
      {...props}
      style={{ backgroundColor: getRandomColor(), ...(props.style as Object) }}
      ref={ref}
    >
      {props.children}
    </T>
  )
);
