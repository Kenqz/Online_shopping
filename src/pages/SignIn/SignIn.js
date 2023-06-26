import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';

import './SignIn.css';

const SignIn = () => {
  return (
    <>
      <div className="formsContainer">
        <LoginForm />
        <RegisterForm />
      </div>
    </>
  );
};

export default SignIn;
