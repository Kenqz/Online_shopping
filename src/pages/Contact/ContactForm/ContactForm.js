import { useRef, useState } from 'react'

import useHttp from '../../../hooks/use-http'
import Loader from '../../../components/Loader/Loader'
import './ContactForm.css'

const ContactForm = () => {
  const { sendRequest, isLoading } = useHttp()

  const [formIsValid, setFormIsValid] = useState(false)
  const [nameIsValid, setNameIsValid] = useState(null)
  const [emailIsValid, setEmailIsValid] = useState(null)
  const [messageIsValid, setMessageIsValid] = useState(null)

  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const messageInputRef = useRef()

  const formValidationHandler = () => {
    if (
      nameInputRef.current.value.length >= 3 &&
      emailInputRef.current.value.includes('@') &&
      messageInputRef.current.value.length >= 3
    ) {
      setFormIsValid(true)
    } else {
      setFormIsValid(false)
    }
  }
  const nameValidationHandler = () => {
    if (nameInputRef.current.value.length < 3) {
      setNameIsValid(false)
    }
  }
  const emailvalidationHandler = () => {
    if (!emailInputRef.current.value.includes('@')) {
      setEmailIsValid(false)
    }
  }
  const messageValidationHandler = () => {
    if (messageInputRef.current.value.length < 3) {
      setMessageIsValid(false)
    }
  }

  const nameInputHandler = () => {
    setNameIsValid(true)
    formValidationHandler()
  }
  const emailInputHandler = () => {
    setEmailIsValid(true)
    formValidationHandler()
  }
  const messageInputHandler = () => {
    setMessageIsValid(true)
    formValidationHandler()
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault()

    const nameInputValue = nameInputRef.current.value
    const emailInputValue = emailInputRef.current.value
    const messageInputValue = messageInputRef.current.value

    if (!formIsValid) {
      return
    }

    const contactFormInfo = {
      name: nameInputValue,
      email: emailInputValue,
      message: messageInputValue,
    }

    await sendRequest({
      url: 'https://webshop-bc01e-default-rtdb.firebaseio.com/messages.json',
      method: 'POST',
      body: contactFormInfo,
    })

    nameInputRef.current.value = ''
    emailInputRef.current.value = ''
    messageInputRef.current.value = ''

    formValidationHandler()
  }

  return (
    <div className="contactFormContainer">
      {isLoading && <Loader />}
      <h1 className="contactFormContainer__heading">Contact Us</h1>
      <p className="contactFormContainer__description">
        Send us a message. We would love to hear what you have to say.
      </p>
      <form onSubmit={formSubmitHandler} className="contactForm">
        <input
          onChange={nameInputHandler}
          onBlur={nameValidationHandler}
          ref={nameInputRef}
          type="text"
          id="name"
          placeholder="Enter your name"
          className={`contactForm__input ${
            nameIsValid === false ? 'contactForm--invalidInput' : ''
          }`}
        />
        <p
          className={`errorMsg ${
            nameIsValid === false ? 'errorMsg--show' : ''
          }`}
        >
          Your name doesn't have enough characters
        </p>
        <input
          onChange={emailInputHandler}
          onBlur={emailvalidationHandler}
          ref={emailInputRef}
          type="email"
          id="email"
          placeholder="Enter a valid email address"
          className={`contactForm__input ${
            emailIsValid === false ? 'contactForm--invalidInput' : ''
          }`}
        />
        <p
          className={`errorMsg ${
            emailIsValid === false ? 'errorMsg--show' : ''
          }`}
        >
          Your email address doesn't contain '@'
        </p>
        <textarea
          onChange={messageInputHandler}
          onBlur={messageValidationHandler}
          ref={messageInputRef}
          id="message"
          placeholder="Enter your message"
          className={`contactForm__textarea ${
            messageIsValid === false ? 'contactForm--invalidInput' : ''
          }`}
        />
        <p
          className={`errorMsg ${
            messageIsValid === false ? 'errorMsg--show' : ''
          }`}
        >
          Your message doesn't have enough characters
        </p>

        <button
          className={
            formIsValid === true
              ? 'contactForm__submitBtn'
              : 'contactForm--disabledBtn'
          }
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ContactForm
