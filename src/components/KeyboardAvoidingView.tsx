import React from "react";
import {
  Platform,
  KeyboardAvoidingView as K,
  KeyboardAvoidingViewProps
} from "react-native";
export const KeyboardAvoidingView = React.forwardRef<
  K,
  KeyboardAvoidingViewProps & { children: React.ReactNode }
>((props, ref: React.Ref<K>) => (
  <K
    {...props}
    behavior={Platform.select({ ios: "padding", android: null })}
    keyboardVerticalOffset={Platform.select({ ios: 44, android: 0 })}
    contentContainerStyle={{
      alignItems: "stretch",
      justifyContent: "center",
      ...(props.contentContainerStyle as Object)
    }}
    style={{
      flex: 1,
      ...(props.style as Object)
    }}
    ref={ref}
  >
    {props.children}
  </K>
));
