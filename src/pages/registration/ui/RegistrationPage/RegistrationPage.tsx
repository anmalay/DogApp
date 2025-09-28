import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { Text } from "@shared/ui/Text/Text";
import { BackIcon } from "@shared/ui/icons/BackIcon";

export const RegistrationPage: React.FC = () => {
  const router = useIonRouter();

  const handleBack = () => {
    router.goBack();
  };

  return (
    <IonPage>
      <IonContent className="ion-no-padding">
        <div className="min-h-full bg-[#F3F3F3] flex flex-col">
          <div className="flex-1 px-5 pt-5 pb-10 flex flex-col justify-between items-center">
            <div className="self-stretch flex flex-col justify-start items-start gap-10">
              {/* Header with back button */}
              <div className="self-stretch h-14 inline-flex justify-start items-center gap-3.5">
                <BackIcon onClick={handleBack} />
              </div>

              {/* Content */}
              <div className="self-stretch flex flex-col items-center gap-8">
                <Text
                  variant="extra-bold-28"
                  color="primary"
                  tag="h1"
                  className="text-center text-gray-700 leading-relaxed"
                >
                  Registration
                </Text>
                <Text
                  variant="medium-16"
                  color="secondary"
                  className="text-center text-gray-600"
                >
                  Registration form will be implemented here
                </Text>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};