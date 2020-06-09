import { Platform, Linking } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Alert2 } from "../components/Alert";
import { showMessage } from "react-native-flash-message";
import { CacheManager } from "react-native-expo-image-cache";
function openPhotos() {
  switch (Platform.OS) {
    case "ios":
      Linking.openURL("photos-redirect://");
      break;
    case "android":
      Linking.openURL("content://media/internal/images/media");
      break;
    default:
      console.log("Could not open gallery app");
  }
}
export async function downloadAsUUID(uri: string) {
  Alert2("다운로드", "파일을 다운로드 합니다", async function () {
    try {
      const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      if (permission.status !== "granted") {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
      }
      const localUri = await CacheManager.get(uri, {}).getPath();
      await MediaLibrary.saveToLibraryAsync(localUri);
      showMessage({
        type: "success",
        message: "다운로드 완료",
      });
      openPhotos();
    } catch (error) {
      showMessage({
        type: "danger",
        message: error.message,
      });
    }
  });
}
