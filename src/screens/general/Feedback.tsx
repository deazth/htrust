import React from 'react';
import {
  Container, Heading, Center, VStack, FormControl, Input, 
  Button, Box, Icon, View, Text, Switch, 
} from 'native-base';

import { 
  PageTitle, TrustLogo, FormContainer, FormTextInput, FormBtnSubmit, 
  DarkModeToggle, FormWrapper
} from '../../components/styles';

export function Feedback() {
  return (
    <FormWrapper>
      <Center>
    
        <FormContainer baseHeight="210px">
          
          <VStack space={2} m={5}>
            <FormTextInput 
              icon="user"
              placeholder="Feedback type"
            />
            <FormTextInput 
              icon="lock"
              placeholder="password"
            />
            <FormBtnSubmit isLoadingText="Authenticating">Submit</FormBtnSubmit>
          </VStack>
        </FormContainer>
        <DarkModeToggle />
      </Center>
    
    </FormWrapper>
    
  );
}

