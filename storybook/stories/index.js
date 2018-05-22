import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { createStore, combineReducers } from 'redux'
import { Provider as ReduxProvider } from 'react-redux';
import { Field, reduxForm, reducer as formReducer } from 'redux-form';

import EmailInput, { validate as validateEmailInput } from '../../src/components/EmailInput';
import PasswordInput, { validate as validatePasswordInput } from '../../src/components/PasswordInput';

const rootReducer = combineReducers({
  form: formReducer,
})

const store = createStore(rootReducer)

const ProviderDecorator = ( story ) => {
  return (
    <ReduxProvider store={ store }>
      { story() }
    </ReduxProvider>
  )
}

const ReduxFormDecorator = reduxFormConfig => story => {
  const ReduxFormed = reduxForm( reduxFormConfig )( story )
  return (
    <ReduxFormed />
  )
}

const validateForm = (values) => {
  const emailErrors = validateEmailInput(values)
  const passwordErrors = validatePasswordInput(values)
  const errors = Object.assign(emailErrors, passwordErrors)
  return errors
}

storiesOf('Form', module)
  .addDecorator(story => (<View style={{flex: 1, flexDirection: 'column', margin: 40, justifyContent: 'flex-start'}}>{story()}</View>))
  .addDecorator(ReduxFormDecorator({ form: 'testform', validate: validateForm }))
  .addDecorator(ProviderDecorator)
  .add('Login', () => (
    <View>
      <Field name="email" label="Email" component={EmailInput}/>
      <Field name="password" label="Password" component={PasswordInput}/>
    </View>
  ));

storiesOf('TextInputs', module)
  .addDecorator(story => (<View style={{flex: 1, flexDirection: 'column', margin: 40, justifyContent: 'flex-start'}}>{story()}</View>))
  .addDecorator(ReduxFormDecorator({ form: 'testform', validate: validateEmailInput }))
  .addDecorator(ProviderDecorator)
  .add('Email', () => (
    <Field name="email" label="Email" component={EmailInput}/>
  ))
  .add('Password', () => (
    <Field name="password" label="Password" component={PasswordInput}/>
  ));
