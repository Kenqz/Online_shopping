import ContactForm from './ContactForm/ContactForm'
import './Contact.css'

import contactImg from '../../assets/contact.jpg'

const Contact = () => {
  return (
    <div className="contact">
      <ContactForm />
      <img src={contactImg} alt="contactImage" className="contact__img"></img>
    </div>
  )
}

export default Contact
