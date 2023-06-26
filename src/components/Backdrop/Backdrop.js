import './Backdrop.css'

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onModalClosing}></div>
}

export default Backdrop
