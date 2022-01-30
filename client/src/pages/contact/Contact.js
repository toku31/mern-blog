import React from 'react'
import './contact.css'

export default function Contact() {
  return (
      <form className="contact">
      <div class="contactContainer">
        <div className="contactTitle">Contact</div>
        <input type="text" name="name" placeholder="Name" className='contactInput'/><br />
        <input  type="email" name="email" placeholder="Email" className='contactInput'/><br />
        <textarea type="text" name="message" placeholder="Message" className='contactTextarea'></textarea><br />
        <button id="submit" type="submit" className='contactButton'>
          Send!
        </button>
      </div>
      </form>
  )
}
