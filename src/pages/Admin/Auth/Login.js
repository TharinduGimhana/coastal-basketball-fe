import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import LoginWidget from "./LoginWidget/LoginWidget";


function Login() {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.overflow = 'hidden';
    }

    return () => {
      if (rootElement) {
        rootElement.style.overflow = '';
      }
    };
  }, []);

  return (
    <section>
      <LoginWidget />
    </section>
  );
}

export default withRouter(Login);
