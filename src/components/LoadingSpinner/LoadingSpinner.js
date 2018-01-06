import React from 'react'
import svg from './oval.svg';

const LoadingSpinner=(props)=>(
  <div style={{paddingTop:'2em',textAlign:'center'}}>
    <img src={svg} width={props.width}/>
  </div>
)

export default LoadingSpinner;