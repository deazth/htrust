import { ScrollView, Spinner, Text } from "native-base";
import React from "react";
import { ScreenWrapper } from "../../components/styles";

export function AreaBook() {
  const [isLoading, setIsLoad] = React.useState(true);

  const fetchLocHist = async () => {};

  setTimeout(() => {
    setIsLoad(false);
  }, 2000);

  return (
    <ScreenWrapper>
      {isLoading ? (
        <Spinner accessibilityLabel="Loading" />
      ) : (
        <>
          <ScrollView>
            <Text>pending research on table-ish display</Text>
          </ScrollView>
        </>
      )}
    </ScreenWrapper>
  );
}
