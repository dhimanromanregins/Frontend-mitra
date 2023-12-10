import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";


const MeetingScreen = () => {
  return (
    <View style={styles.androidLarge5}>
      <View style={styles.androidLarge5Child} />
     <TouchableOpacity>
     <Image
        style={styles.speakerIcon}
        contentFit="cover"
        source={require("../assets/speaker.png")}
      />
     </TouchableOpacity>
      <Image
        style={[styles.lessThanIcon, styles.iconLayout1]}
        contentFit="cover"
        source={require("../assets/less-than.png")}
      />
      <View style={[styles.groupParent, styles.groupParentLayout]}>
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={[styles.groupChild, styles.groupChildPosition]} />
          <Image
            style={styles.insTransformed2Icon}
            contentFit="cover"
            source={require("../assets/0101925-instransformed-2.png")}
          />
        </View>
        <Image
          style={styles.muteUnmuteIcon}
          contentFit="cover"
          source={require("../assets/mute-unmute.png")}
        />
      </View>
      <View style={[styles.groupContainer, styles.groupParentLayout]}>
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={[styles.groupChild, styles.groupChildPosition]} />
          <Image
            style={styles.insTransformed2Icon}
            contentFit="cover"
            source={require("../assets/0101925-instransformed-2.png")}
          />
        </View>
        <Image
          style={styles.muteUnmuteIcon}
          contentFit="cover"
          source={require("../assets/mute-unmute.png")}
        />
      </View>
      <View style={[styles.groupView, styles.groupPosition]}>
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={[styles.groupChild, styles.groupChildPosition]} />
          <Image
            style={styles.insTransformed2Icon}
            contentFit="cover"
            source={require("../assets/0101925-instransformed-2.png")}
          />
        </View>
        <Image
          style={styles.muteUnmuteIcon}
          contentFit="cover"
          source={require("../assets/mute-unmute.png")}
        />
      </View>
      <View style={[styles.groupParent1, styles.groupPosition]}>
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={[styles.groupChild, styles.groupChildPosition]} />
          <Image
            style={styles.insTransformed2Icon}
            contentFit="cover"
            source={require("../assets/0101925-instransformed-2.png")}
          />
        </View>
        <Image
          style={styles.muteUnmuteIcon}
          contentFit="cover"
          source={require("../assets/mute-unmute.png")}
        />
      </View>
      <View style={[styles.groupParent2, styles.groupParentPosition]}>
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={[styles.groupChild, styles.groupChildPosition]} />
          <Image
            style={styles.insTransformed2Icon}
            contentFit="cover"
            source={require("../assets/0101925-instransformed-2.png")}
          />
        </View>
        <Image
          style={styles.muteUnmuteIcon}
          contentFit="cover"
          source={require("../assets/mute-unmute.png")}
        />
      </View>
      <View style={[styles.groupParent3, styles.groupParentPosition]}>
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={[styles.groupChild, styles.groupChildPosition]} />
          <Image
            style={styles.insTransformed2Icon}
            contentFit="cover"
            source={require("../assets/0101925-instransformed-2.png")}
          />
        </View>
        <Image
          style={styles.muteUnmuteIcon}
          contentFit="cover"
          source={require("../assets/mute-unmute.png")}
        />
      </View>
      <View style={[styles.ellipseParent, styles.ellipseLayout]}>
        <Image
          style={[styles.ellipseIcon, styles.ellipseLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-1.png")}
        />
        <Image
          style={styles.callIcon}
          contentFit="cover"
          source={require("../assets/call.png")}
        />
      </View>
      <View style={[styles.ellipseGroup, styles.ellipseLayout]}>
        <Image
          style={[styles.ellipseIcon, styles.ellipseLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-5.png")}
        />
        <Image
          style={styles.muteUnmuteIcon6}
          contentFit="cover"
          source={require("../assets/mute-unmute1.png")}
        />
      </View>
      <View style={[styles.ellipseContainer, styles.ellipseLayout]}>
        <Image
          style={[styles.ellipseIcon, styles.ellipseLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-5.png")}
        />
        <Image
          style={[styles.videoCallIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/video-call.png")}
        />
      </View>
      <View style={[styles.rectangleParent4, styles.groupChild5Layout]}>
        <View style={[styles.groupChild5, styles.groupChild5Layout]} />
        <Image
          style={styles.insTransformed1Icon}
          contentFit="cover"
          source={require("../assets/0101925-instransformed-1.png")}
        />
        <Image
          style={[styles.muteUnmuteIcon7, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/mute-unmute2.png")}
        />
      </View>
      <Image
        style={[styles.connectIcon, styles.iconLayout1]}
        contentFit="cover"
        source={require("../assets/connect.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout1: {
    width: 24,
    position: "absolute",
  },
  groupParentLayout: {
    height: 214,
    width: 135,
    position: "absolute",
  },
  groupChildPosition: {
    backgroundColor: Color.colorGainsboro,
    left: 0,
    top: 0,
  },
  groupPosition: {
    top: 303,
    height: 214,
    width: 135,
    position: "absolute",
  },
  groupParentPosition: {
    top: 541,
    height: 214,
    width: 135,
    position: "absolute",
  },
  ellipseLayout: {
    height: 58,
    width: 58,
    position: "absolute",
  },
  iconLayout: {
    height: 26,
    position: "absolute",
  },
  groupChild5Layout: {
    height: 175,
    width: 105,
    position: "absolute",
  },
  androidLarge5Child: {
    left: -7,
    backgroundColor: Color.colorKhaki,
    width: 393,
    height: 49,
    top: 0,
    position: "absolute",
  },
  speakerIcon: {
    left: 289,
    width: 27,
    height: 28,
    top: 16,
    position: "absolute",
  },
  lessThanIcon: {
    top: 17,
    left: 28,
    height: 28,
  },
  groupChild: {
    height: 214,
    width: 135,
    position: "absolute",
  },
  insTransformed2Icon: {
    top: 44,
    height: 170,
    left: 0,
    width: 135,
    position: "absolute",
  },
  rectangleParent: {
    left: 0,
    top: 0,
  },
  muteUnmuteIcon: {
    top: 169,
    left: 86,
    width: 39,
    height: 31,
    position: "absolute",
  },
  groupParent: {
    top: 67,
    height: 214,
    left: 28,
  },
  groupContainer: {
    left: 201,
    top: 67,
    height: 214,
  },
  groupView: {
    left: 28,
  },
  groupParent1: {
    left: 201,
  },
  groupParent2: {
    left: 201,
  },
  groupParent3: {
    left: 28,
  },
  ellipseIcon: {
    left: 0,
    top: 0,
  },
  callIcon: {
    top: 4,
    width: 50,
    height: 50,
    left: 3,
    position: "absolute",
  },
  ellipseParent: {
    left: 157,
    top: 726,
    width: 58,
  },
  muteUnmuteIcon6: {
    top: 7,
    left: 13,
    width: 32,
    height: 43,
    position: "absolute",
  },
  ellipseGroup: {
    left: 30,
    top: 726,
    width: 58,
  },
  videoCallIcon: {
    width: 52,
    left: 3,
    top: 16,
  },
  ellipseContainer: {
    left: 275,
    top: 726,
    width: 58,
  },
  groupChild5: {
    borderRadius: Border.br_8xl,
    backgroundColor: Color.colorGainsboro,
    left: 0,
    top: 0,
  },
  insTransformed1Icon: {
    top: 36,
    borderBottomRightRadius: Border.br_6xl,
    borderBottomLeftRadius: Border.br_6xl,
    height: 139,
    width: 105,
    left: 0,
    position: "absolute",
  },
  muteUnmuteIcon7: {
    top: 135,
    left: 68,
    width: 30,
  },
  rectangleParent4: {
    top: 485,
    left: 258,
  },
  connectIcon: {
    top: 6,
    left: 333,
    height: 48,
  },
  androidLarge5: {
    backgroundColor: Color.colorCornsilk,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default MeetingScreen;
