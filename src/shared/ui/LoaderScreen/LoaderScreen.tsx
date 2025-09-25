import { FC } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Loader } from "@shared/ui/icons/Loader";

export const LoaderScreen: FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-8">
            <Loader size={120} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
