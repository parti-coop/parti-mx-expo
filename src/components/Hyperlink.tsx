import React from "react";
import H from "react-native-hyperlink";
import { StyleProp, TextStyle, Clipboard, Linking } from "react-native";
import { getLinkPreview } from "link-preview-js";
import { Body16, Grey15 } from "./Text";
import { Image } from "./Image";
import { showMessage } from "react-native-flash-message";
import { TORow, TO0 } from "./TouchableOpacity";
import { ViewRow } from "./View";
interface Props {
  text: string;
  linkDefault?: boolean;
  linkify?: object;
  linkStyle?: StyleProp<TextStyle>;
  linkText?: string | ((text: string) => string);
  onPress?: (url: string, text: string) => void;
  onLongPress?: (url: string, text: string) => void;
}
function copyToClipboard(url: string, text: string) {
  Clipboard.setString(text);
  showMessage({ type: "success", message: text + " 복사되었습니다." });
}
export default function Hyperlink(props: Props) {
  const { text, ...rest } = props;
  const [og, setOg] = React.useState(null);
  React.useEffect(() => {
    if (text) {
      getLinkPreview(text, {
        imagesPropertyType: "og",
      })
        .then(
          (data: {
            url: string;
            title: any;
            siteName: any;
            description: any;
            mediaType: any;
            contentType: string | undefined;
            images: string[];
            videos: {
              url: any;
              secureUrl: any;
              type: any;
              width: any;
              height: any;
            }[];
            favicons: any[];
          }) => {
            if (data && data.images.length) {
              setOg(
                <TO0 onPress={() => Linking.openURL(data.url)}>
                  <Image
                    source={{ uri: data.images[0] }}
                    style={{ width: "100%", aspectRatio: 1.91, height: "auto" }}
                  />
                  <ViewRow style={{ alignSelf: "flex-start" }}>
                    <Image
                      source={{ uri: data.favicons[0] }}
                      style={{ width: 32, aspectRatio: 1, height: "auto" }}
                    />
                    <Body16 style={{ flex: 1 }}>{data.title}</Body16>
                  </ViewRow>
                </TO0>
              );
            }
          }
        )
        .catch((err) => console.log(err.message));
    }
  }, [text]);
  if (text) {
    return (
      <>
        <H
          linkDefault={true}
          linkStyle={{ color: "#4aacc7" }}
          onLongPress={copyToClipboard}
          {...rest}
        >
          <Body16>{text}</Body16>
        </H>
        {og}
      </>
    );
  } else {
    return <Grey15>삭제되었습니다.</Grey15>;
  }
}
