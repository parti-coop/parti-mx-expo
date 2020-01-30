import React, { FunctionComponent } from "react";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
export const GroupNew: FunctionComponent<any> & { navigationOptions?: any } = (
  props: NavigationDrawerScreenProps<{}>
) => {
  props.navigation.openDrawer();
  return null;
};
GroupNew.navigationOptions = {
  drawerLockMode: "locked-open"
};
export default GroupNew;
