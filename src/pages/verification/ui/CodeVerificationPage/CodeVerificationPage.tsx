import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useIonRouter } from "@ionic/react";
import { Text } from "@shared/ui/Text/Text";
import { Button } from "@shared/ui/Button/Button";
import { CodeInput } from "@shared/ui/CodeInput/CodeInput";
import { BackIcon } from "@shared/ui/icons/BackIcon";
import { useResendTimer } from "@shared/hooks/useResendTimer";

// interface CodeVerificationPageProps {
//   email: string;
//   onSuccess?: () => void;
//   onResendCode?: () => void;
// }

export const CodeVerificationPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useIonRouter();
  const [codeError, setCodeError] = useState<string>("");

  // Get email and registration flag from router state
  const [email] = useState<string>(() => {
    // Try to get email from router state/location state
    const locationState = (window.history.state as { email?: string })?.email;
    return locationState || "user@example.com";
  });

  const [isRegistration] = useState<boolean>(() => {
    // Check if this is registration flow
    const locationState = (window.history.state as { isRegistration?: boolean })
      ?.isRegistration;
    return locationState || false;
  });

  const { timeLeft, canResend, startTimer, formatTime } = useResendTimer(59);

  React.useEffect(() => {
    // Start timer when component mounts
    startTimer();
  }, [startTimer]);

  const handleBack = () => {
    router.goBack();
  };

  const handleCodeComplete = (code: string) => {
    setCodeError("");

    // Validate against hardcoded value for now
    if (code === "1234") {
      // Success - navigate based on flow type
      if (isRegistration) {
        // Registration flow - navigate to onboarding
        router.push("/onboarding", "forward", "push");
      } else {
        // Login flow - navigate to onboarding as well for now
        router.push("/onboarding", "forward", "push");
      }
    } else {
      // Show error
      setCodeError(t("Invalid code"));
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      // Here you would typically call your API to resend the code
      console.log("Resending code for:", email);
      setCodeError("");
      startTimer();
      // You can also call onResendCode callback if provided
    }
  };

  const handleCodeChange = () => {
    // Clear error when user starts typing
    if (codeError) {
      setCodeError("");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-no-padding">
        <div className="min-h-full bg-[#F3F3F3] flex flex-col">
          <div
            className="flex-1 px-5 pt-5 pb-10 flex flex-col justify-between items-center"
            style={{ paddingTop: "67px" }}
          >
            <div className="self-stretch flex flex-col justify-start items-start gap-10">
              {/* Header with back button */}
              <div className="self-stretch h-14 inline-flex justify-start items-center gap-3.5">
                <BackIcon onClick={handleBack} />
              </div>

              {/* Title */}
              <Text
                variant="extra-bold-28"
                color="primary"
                tag="h1"
                className="self-stretch text-center text-gray-700 leading-relaxed"
              >
                {t("Check your email")}
              </Text>

              {/* Code input */}
              <div className="self-stretch flex flex-col justify-center items-center gap-10">
                <CodeInput
                  length={4}
                  onComplete={handleCodeComplete}
                  onCodeChange={handleCodeChange}
                  hasError={!!codeError}
                  errorMessage={codeError}
                  className="self-stretch"
                />
              </div>
            </div>

            {/* Resend code timer/button - at bottom but visible above keyboard */}
            <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
              <Text
                variant="medium-small-12"
                color="secondary"
                className="self-stretch text-center"
              >
                {canResend ? (
                  <Button
                    variant="outline"
                    size="medium"
                    onClick={handleResendCode}
                    className="mx-auto"
                  >
                    {t("New code")}
                  </Button>
                ) : (
                  <span className="text-slate-500 leading-none">
                    {t("Get new code available in ")} {formatTime(timeLeft)}
                  </span>
                )}
              </Text>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
