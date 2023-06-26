import { useHistory } from 'react-router-dom';

import './404.css';

const PageNotFound = () => {
  const history = useHistory();

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <div className="pageNotFound">
      <div className="pageNotFound__heading">
        <h1 className="pageNotFound__404">404</h1>
        <p>Page not found</p>
      </div>
      <div className="pageNotFound__content">
        <p>The page you're trying to reach has not been found.</p>
      </div>
      <div className="pageNotFound__buttons">
        <button className="pageNotFound__returnButton" onClick={returnToHome}>
          Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
