import React, { Suspense, useEffect } from 'react'
import { FloatButton } from 'antd';
import { BrowserRouter, useLocation, Route, Switch } from "react-router-dom";
import { RouterConfig } from "navigation/RouterConfig";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from 'react-ga4';
import "./App.css";
import BookCourt from './pages/BookCourt/BookCourt';

export const initGA = () => {
  ReactGA.initialize('G-MY5LZDCZEG');
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

export const logEvent = (category, action) => {
  ReactGA.event({
    category,
    action,
  });
};

function App() {
  const TrackPageView = () => {
    const location = useLocation();

    useEffect(() => {
      logPageView();
    }, [location]);

    return null;
  };

  useEffect(() => {
    initGA();
    logPageView();
    console.clear();
  }, []);

  return (
    <BrowserRouter>
      <HelmetProvider>
        <Suspense>
          <TrackPageView />
          <Switch>
            <Route path="/book-court" component={BookCourt} />
            <Route path="/" component={RouterConfig} />
          </Switch>
        </Suspense>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;