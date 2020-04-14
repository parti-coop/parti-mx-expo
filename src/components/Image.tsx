import React from "react";
import {
  Image as ImageCache,
  CacheManager,
} from "react-native-expo-image-cache";
export { Image } from "react-native";
import IV from "react-native-image-viewing";

export function cachedArray(imgArray: string[]) {
  return Promise.all(
    imgArray.map((uri) => CacheManager.get(uri, {}).getPath())
  );
}

export async function ImageSourceArray(imgArray: string[]) {
  const imgArr = await cachedArray(imgArray);
  return imgArr.map((i: string) => ({ uri: i }));
}

export const ImageView = (props: {
  imageIndex: number;
  images: string[] | null;
  visible: boolean;
  onRequestClose: () => void;
}) => {
  const { images, ...rest } = props;
  const [imgArr, setImgArr] = React.useState(null);
  React.useEffect(() => {
    if (images?.length > 0) {
      ImageSourceArray(images).then((imgArr) => setImgArr(imgArr));
    }
  }, [images]);
  if (imgArr) {
    return <IV images={imgArr} {...rest} />;
  } else {
    return null;
  }
};

export { ImageCache, CacheManager };
