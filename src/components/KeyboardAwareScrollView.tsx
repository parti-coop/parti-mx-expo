import React from "react";
import { Platform } from "react-native";
import {
  KeyboardAwareScrollView as K,
  KeyboardAwareScrollViewProps
} from "react-native-keyboard-aware-scroll-view";
export const KeyboardAwareScrollView = React.forwardRef<
  K,
  KeyboardAwareScrollViewProps & { children: React.ReactNode }
>((props, ref: React.Ref<K>) => (
  <K
    keyboardShouldPersistTaps={"handled"}
    ref={ref}
    extraScrollHeight={200}
    {...props}
    style={[props.style]}
  >
    {props.children}
  </K>
));
