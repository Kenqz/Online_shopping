import Nav from '../Header/Nav/Nav';
import { AiFillPhone } from 'react-icons/ai';
import './Footer.css';

const Footer = (props) => {
  return (
    <footer className={`footer ${props.position}`}>
      <div className="footer__top">
        <div className="footer__description">
          <h3>More About Company</h3>
          <p>Welcome to the Awesome shop founded in 1968.</p>
          <p>We have been providing online services since 2006.</p>
        </div>
        <Nav classNav="in-footer" classLi="in-footer-li" />
        <div className="footer__info">
          <h3>Contact information </h3>
          <p>Milutina Milankovica 9z</p>
          <p>
            +381313131{' '}
            <span>
              <span>
                <AiFillPhone />
              </span>
            </span>
          </p>
          <p>vicert@vicert.com</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>Copyright &copy; 2021 Awesome Shop.</p>
      </div>
    </footer>
  );
};

export default Footer;
