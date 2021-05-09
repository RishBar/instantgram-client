import React from 'react'
import { Switch } from 'react-router-dom'
import AuthScreens from './authentication';

export default () => {
  return (
      <Switch>
          {
              [   
                  ...AuthScreens,
              ]
          }
      </Switch>
  )
}