import React from "react";
import {
  Platform,
  KeyboardAvoidingView as K,
  KeyboardAvoidingViewProps,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
export const KeyboardAvoidingView = React.forwardRef<
  K,
  KeyboardAvoidingViewProps & { children: React.ReactNode }
>((props, ref: React.Ref<K>) => (
  <K
    behavior={Platform.select({ ios: "padding", android: null })}
    keyboardVerticalOffset={Platform.select({ ios: 44, android: 0 })}
    {...props}
    contentContainerStyle={[
      {
        alignItems: "stretch",
        justifyContent: "center",
      },
      props.contentContainerStyle,
    ]}
    style={[
      {
        flex: 1,
      },
      props.style,
    ]}
    ref={ref}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>{props.children}</>
    </TouchableWithoutFeedback>
  </K>
));
export const KAV = React.forwardRef<
  K,
  KeyboardAvoidingViewProps & { children: React.ReactNode }
>((props, ref: React.Ref<K>) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <K
      keyboardVerticalOffset={Platform.select({ ios: 44, android: 0 })}
      {...props}
      ref={ref}
    >
      <>{props.children}</>
    </K>
  </TouchableWithoutFeedback>
));
