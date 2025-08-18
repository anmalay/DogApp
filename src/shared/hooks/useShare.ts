import { platformUtils } from "./usePlatform";

interface ShareData {
  title: string;
  text?: string;
  url?: string;
}

export const useShare = () => {
  const share = async (data: ShareData) => {
    const shareData = {
      title: data.title,
      text: data.text || data.title,
      url: data.url || window.location.href,
    };

    await platformUtils.share(shareData);
  };

  return { share };
};
