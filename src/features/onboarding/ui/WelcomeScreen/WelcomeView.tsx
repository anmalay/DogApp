import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "@shared/ui";
import startPageDog from "@shared/assets/images/welcome/startPageDog.webp";

interface WelcomeViewProps {
  onCreateAccount: () => void;
  onSignIn: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onCreateAccount, onSignIn }) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-full bg-zinc-100 flex flex-col justify-end overflow-hidden">
      {/* Dog image - centered with 568px height, edges cropped */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[568px] h-[568px] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={startPageDog}
          alt="Welcome dog"
        />
      </div>

      {/* Bottom drawer content overlaying the image */}
      <div className="relative z-10 px-5 py-10 bg-zinc-100 rounded-tl-3xl rounded-tr-3xl">
        <div className="px-3 pb-12 flex flex-col items-center gap-5">
          <Text
            variant="extra-bold-28"
            className="text-center text-gray-700 leading-relaxed"
            tag="div"
          >
            {t("Dog appa")}
          </Text>
          <Text
            variant="regular-16"
            className="text-center text-gray-700 leading-tight"
            tag="div"
          >
            {t("Find company for walks and a map of dog-friendly places")}
          </Text>
        </div>

        <div className="flex flex-col gap-2.5">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={onCreateAccount}
            className="px-6 py-5 bg-gray-700 rounded-[59px]"
          >
            <Text variant="medium-16" color="white" tag="div">
              {t("Create Account")}
            </Text>
          </Button>

          <Button
            variant="outline"
            size="large"
            fullWidth
            onClick={onSignIn}
            className="px-6 py-5 bg-white rounded-[59px]"
          >
            <Text variant="medium-16" className="text-gray-700" tag="div">
              {t("Sign In")}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
