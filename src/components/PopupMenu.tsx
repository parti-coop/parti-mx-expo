import React, { Component } from "react";
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ICON_SIZE = 24;

export default class PopupMenu extends Component<
  {
    actions: string[];
    onPress: (eventName: any, index: any) => void;
  },
  { icon: React.Component }
> {
  constructor(props) {
    super(props);
    this.state = {
      icon: null
    };
  }

  onError() {
    console.log("Popup Error");
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      );
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <MaterialIcons
            name="more-vert"
            size={ICON_SIZE}
            color={"grey"}
            ref={this.onRef}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onRef = (icon: React.Component) => {
    if (!this.state.icon) {
      this.setState({ icon });
    }
  };
}
