// File: AppNavigator.test.js

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import AppNavigator from '../src/navigation/AppNavigator';

describe('AppNavigator', () => {
  it('renders Home by default', () => {
    const {getByText} = render(<AppNavigator />);
    const homeElement = getByText('Home');
    expect(homeElement).toBeDefined();
  });
});
