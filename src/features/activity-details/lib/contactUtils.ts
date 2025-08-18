// features/contact-organizer/lib/contactUtils.ts

import { platformUtils } from "@shared/hooks";

export const handleContactMethod = (contactMethod: string) => {
  if (contactMethod.includes("t.me")) {
    platformUtils.openLink(contactMethod);
  } else if (contactMethod.includes("wa.me")) {
    platformUtils.openLink(contactMethod);
  } else {
    platformUtils.openLink(`tel:${contactMethod}`);
  }
};
