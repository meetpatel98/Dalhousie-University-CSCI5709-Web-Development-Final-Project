import React from 'react'
import '../App.css'

function Thank() {

  return (
    <div>
        <img src={require('../image/8401.jpg')} height="40%" width="40%" className="image-class"></img>
        <div className="title-class">Thank you For Shopping</div>
        <button className="button-class" >Go to home page</button>
    </div>
  )
}

export default Thank