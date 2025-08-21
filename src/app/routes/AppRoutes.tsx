import { FC } from "react";
import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { WelcomePage } from "@pages/welcome";

export const AppRoutes: FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        {/* <AppHeader /> */}
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/welcome" component={WelcomePage} />
            <Route exact path="/">
              <Redirect to="/welcome" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  );
};
