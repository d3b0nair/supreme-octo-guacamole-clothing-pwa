import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { connect } from "react-redux";

import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { checkUserSession } from "./redux/user/user.actions";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { GlobalStyles } from "./global.styles";

import history from "./history";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const InvoicePage = lazy(() => import("./pages/invoice/invoice.component"));

function App(props) {
  const { checkUserSession, currentUser } = props;

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <Router history={history}>
      <React.Fragment>
        <GlobalStyles />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path="/" component={HomePage} />
              <Route path="/shop" component={ShopPage} />
              <Route
                exact
                path="/signin"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
                }
              />
              <Route path="/checkout" component={CheckoutPage} />
              <Route path="/invoice/:id" component={InvoicePage} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </React.Fragment>
    </Router>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (disatch) => ({
  checkUserSession: () => disatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
