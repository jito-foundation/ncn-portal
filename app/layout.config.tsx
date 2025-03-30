import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { i18n } from "@/lib/i18n";

import jitoLogo from "../public/icons/jito_logo_white.webp";
import githubIcon from "../public/icons/github.svg";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <div className="flex items-center gap-2 pl-2">
          <Image src={jitoLogo} alt="Logo" width={24} height={24} />
          <span>NCN Portal</span>
        </div>
      </>
    ),
    url: "/docs"
  },
  links: [
    {
      icon: <Image src={githubIcon} alt="Logo" width={24} height={24} />,
      text: 'Github',
      url: 'https://github.com/jito-foundation',
      active: 'none',
    },
  ],
  i18n: true,
};
