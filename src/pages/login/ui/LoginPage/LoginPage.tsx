import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/ui/Text/Text";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";
import { BackIcon } from "@shared/ui/icons/BackIcon";

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const handleBack = () => {
    window.history.back();
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

              {/* Welcome title */}
              <Text
                variant="extra-bold-28"
                color="primary"
                tag="h1"
                className="self-stretch text-center text-gray-700 leading-relaxed"
              >
                {t("Welcome back!")}
              </Text>

              {/* Email input */}
              <div className="self-stretch flex flex-col justify-start items-center gap-1">
                <Input placeholder={t("E-mail")} type="email" size="full" />
              </div>

              {/* Action buttons */}
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  className="bg-gray-700 text-white"
                >
                  {t("Get email code")}
                </Button>
                <Button
                  variant="secondary"
                  size="large"
                  fullWidth
                  className="bg-white text-gray-700"
                >
                  {t("Login with Telegram")}
                </Button>
              </div>
            </div>

            {/* Terms and privacy policy */}
            <Text
              variant="medium-small-12"
              color="secondary"
              className="self-stretch text-center"
            >
              <span className="text-slate-500 leading-none">
                {t("By continuing, you agree to the ")}
              </span>
              <span className="text-gray-700 leading-none">
                {t("terms of use")}
              </span>
              <span className="text-slate-500 leading-none">{t(" and ")}</span>
              <span className="text-gray-700 leading-none">
                {t("privacy policy")}
              </span>
            </Text>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
