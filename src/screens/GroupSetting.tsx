import React from "react";
import { ViewStyle, Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@apollo/react-hooks";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { showMessage } from "react-native-flash-message";

import { ImageCache, Image } from "../components/Image";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { RootStackParamList } from "./AppContainer";
import { Title22, Mint16 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, V1 } from "../components/View";
import { TORowCenter, TO0 } from "../components/TouchableOpacity";
import HeaderConfirm from "../components/HeaderConfirm";
import { LineSeperator } from "../components/LineDivider";

import { useStore } from "../Store";
import { updateGroupName } from "../graphql/mutation";
import { uploadFileUUIDGetUrl } from "../firebase";

import iconPhoto from "../../assets/iconPhoto.png";
import iconNoImg from "../../assets/iconNoImg.png";
import iconClosed from "../../assets/iconClosed.png";

const boxStyle = {
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  shadowOpacity: 1,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  marginTop: 50,
  justifyContent: "flex-start",
  alignItems: "stretch",
  paddingVertical: 50,
  flex: 1,
} as ViewStyle;
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "GroupSetting">;
  route: RouteProp<RootStackParamList, "GroupSetting">;
}) => {
  const [{ group_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState(props.route.params.title);
  const [imgUrl, setImgUrl] = React.useState(props.route.params.bg_img_url);
  const [update, { loading }] = useMutation(updateGroupName);
  async function save() {
    dispatch({ type: "SET_LOADING", loading: true });
    let bg_img_url = null;
    if (imgUrl) {
      if (imgUrl !== props.route.params.bg_img_url) {
        bg_img_url = await uploadFileUUIDGetUrl(imgUrl, `bgImg`);
      } else {
        bg_img_url = props.route.params.bg_img_url;
      }
    }
    await update({ variables: { bg_img_url, group_id, groupName } });
    props.navigation.goBack();
    showMessage({ type: "success", message: "변경 하였습니다." });
  }

  function addImage() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    })
      .then((res) => {
        if (res.cancelled !== true) {
          setImgUrl(res.uri);
        }
      })
      .catch(alert);
  }
  function removeImageHandler() {
    setImgUrl(null);
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <>
      <HeaderConfirm onPress={save} />
      <KeyboardAwareScrollView>
        <View style={{ paddingHorizontal: 30 }}>
          <Title22>그룹</Title22>
        </View>
        <View style={boxStyle}>
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            placeholder="그룹 이름 입력"
            onSubmitEditing={() => Keyboard.dismiss()}
            autoFocus={true}
            style={{
              fontSize: 17,
              textAlign: "center",
              marginBottom: 30,
            }}
          />
          <LineSeperator />
          <V1 style={{ margin: 30, marginBottom: 0 }}>
            {imgUrl ? (
              <>
                <ImageCache
                  uri={imgUrl}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 150,
                  }}
                />
                <TO0
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    backgroundColor: "#12BD8E",
                    top: -8,
                    right: -8,
                    position: "absolute",
                  }}
                  onPress={removeImageHandler}
                >
                  <Image source={iconClosed} style={{ tintColor: "white" }} />
                </TO0>
              </>
            ) : (
              <Image
                source={iconNoImg}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 150,
                }}
              />
            )}
          </V1>
          <TORowCenter style={{ marginTop: 30 }} onPress={addImage}>
            <Image source={iconPhoto} style={{ marginRight: 5 }} />
            <Mint16>{imgUrl ? "사진 변경" : "사진 추가"}</Mint16>
          </TORowCenter>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
