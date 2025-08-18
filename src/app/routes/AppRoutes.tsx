import { FC } from "react";
import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { AppFooter, AppHeader } from "@widgets/layout";

export const AppRoutes: FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <AppHeader />
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/">
              <Redirect to="/walks" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  );
};
