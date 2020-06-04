import React from "react";
import {
  Image as ImageCacheInternal,
  CacheManager,
} from "react-native-expo-image-cache";
import { Image } from "react-native";
import IV from "react-native-image-viewing";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";

import iconGroup from "../../assets/iconGroup.png";
// import appIcon from "../../assets/appIcon.png";

export function cachedArray(imgArray: ImageInfo[]) {
  return Promise.all(
    imgArray.map((img) => {
      return new Promise(async (res) => {
        const uri = await CacheManager.get(img.uri, {}).getPath();
        res({ uri });
      });
    })
  );
}

export const ImageView = (props: {
  imageIndex: number;
  images: ImageInfo[] | null;
  visible: boolean;
  onRequestClose: () => void;
}) => {
  const { images, ...rest } = props;
  const [imgArr, setImgArr] = React.useState(null);
  React.useEffect(() => {
    if (images?.length > 0) {
      cachedArray(images).then((imgArr) => setImgArr(imgArr));
    }
  }, [images]);
  if (imgArr) {
    return <IV images={imgArr} presentationStyle="overFullScreen" {...rest} />;
  } else {
    return null;
  }
};

export const ImageCache = (props) => {
  if (props.uri.startsWith("file:/")) {
    return <Image {...props} source={{ uri: props.uri }} />;
  } else {
    return <ImageCacheInternal {...props} />;
  }
};

export { CacheManager, Image };
