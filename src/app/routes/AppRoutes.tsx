import { FC } from "react";
import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { AppFooter, AppHeader } from "@widgets/layout";
import {
  ActivitiesList,
  ActivityDetail,
  CreateActivity,
  EditActivity,
} from "@pages/index";

export const AppRoutes: FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <AppHeader />
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/activities" component={ActivitiesList} />
            <Route exact path="/activity/create" component={CreateActivity} />
            <Route exact path="/activity/:id/edit" component={EditActivity} />
            <Route exact path="/activity/:id" component={ActivityDetail} />
            <Route exact path="/">
              <Redirect to="/activities" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  );
};
