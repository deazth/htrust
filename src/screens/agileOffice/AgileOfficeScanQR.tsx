import { Text } from "native-base";
import React from "react";
import { ScreenWrapper } from "../../components/styles";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, StyleSheet, View } from "react-native";

export function AgileOfficeScanQR({ navigation }) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [progtext, setProgtext] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const splitted = data.split("/");
    let arc = splitted.length;
    if (arc >= 5) {
      // alert('type: ' + splitted[arc-3] + ', code: ' + splitted[arc-1]);

      navigation.navigate("AgileOfficeScanResult", {
        type: splitted[arc - 3],
        qrcode: splitted[arc - 1],
      });
    } else {
      alert("invalid QR");
    }

    // navigation.goBack();
  };

  return (
    <>
      {hasPermission === null ? (
        <Text>'Requesting for camera permission'</Text>
      ) : hasPermission === false ? (
        <Text>'Camera permission not granted'</Text>
      ) : (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.container]}
          >
            <View style={styles.layerTop} />
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </BarCodeScanner>
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </>
      )}
    </>
  );
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 6,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
});
