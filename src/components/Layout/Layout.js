import Header from './Header/Header';
import Footer from './Footer/Footer';

import './Layout.css'

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="main">{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
