import React from 'react'
import { Switch } from 'react-router-dom'
import AuthScreens from './authentication';
import LandingScreens from './landing';

export default () => {
  return (
      <Switch>
          {
              [   
                  ...AuthScreens,
                  ...LandingScreens
              ]
          }
      </Switch>
  )
}