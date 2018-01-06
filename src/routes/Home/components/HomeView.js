import React from 'react'
import classes from './HomeView.scss'

export const HomeView = () => (
  <div className={classes.description}>

    <div>This is the sample project for the interview</div>
    <div>Please check the answer, thank you! </div>
    <br />    
    <div>If you want to run it, please follow these steps:</div>
    <div>1. clone the whole project to your local path. </div>
    <div>2. run 'npm install' to install all the required packeges.</div>
    <div>3. run 'npm start' to compile the project in development mode.</div>
    <div>4. view the project in http://localhost:3000.</div>
    <div>5. or run 'npm run deploy:prod' to deploy it.</div>

  </div>
)

export default HomeView


