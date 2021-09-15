import { Text } from 'native-base';
import React from 'react'
import { ScreenWrapper } from '../../components/styles';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, StyleSheet } from 'react-native';


export function AoScanQR() {

  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [progtext, setProgtext] = React.useState('');


  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    alert(data);
  };

  return (
    <ScreenWrapper>
      { hasPermission === null ? 
        (<Text>'Requesting for camera permission'</Text>) : 
        hasPermission === false ? 
        (<Text>'Camera permission not granted'</Text>) : 
        (
          <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.cam}
          />
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          </>
        )
        }

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  cam: {
    width: 300,
    height: 200,
  },
});