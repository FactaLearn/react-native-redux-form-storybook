import React from 'react';
import { TextInput, View, Text } from 'react-native';

const styles = {
  view: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 80,
  },

  input: {
    height: 40,
    width: 220,
    padding: 5,
    borderWidth: 1,
  }
}

export function validate(values) {
  console.log('testestese')
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must have more than 8 characters'
  }
  return errors
}

export default function PasswordInput(props) {
  const { input, label, meta: { pristine, dirty, touched, error }, ...inputProps } = props;

  return (
    <View style={styles.view}>
      <View>
        <Text style={styles.text}>{label}</Text>
        <TextInput
          {...inputProps}
          style={styles.input}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          />
        <Text style={styles.text}>{touched && error && <Text>{error}</Text>}</Text>
      </View>
    </View>
  );
}
