import React from 'react';
import { View, Button as Btn } from 'react-native';

const Button = ({ style, ...props }) => {
  return (
    <View style={style}>
      <Btn {...props} />
    </View>
  );
};

export default Button;
