import { FC } from "react";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { WelcomePage } from "@pages/welcome";
import { LoginPage } from "@pages/login";
import { RegistrationPage } from "@pages/registration";
import { OnboardingPage } from "@pages/onboarding";

export const AppRoutes: FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet animated>
        <Switch>
          <Route exact path="/welcome" component={WelcomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/onboarding" component={OnboardingPage} />
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
