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
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

export default function EmailInput(props) {
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
