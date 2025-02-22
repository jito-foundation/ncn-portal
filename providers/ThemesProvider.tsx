import { ThemeProvider } from "@/components/Themes";
import { Theme } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

export const ThemesProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <Theme accentColor="violet" style={{ height: "100%" }} className="h-full">
        {children}
        {/* <ThemePanel /> */}
      </Theme>
    </ThemeProvider>
  );
};

export default ThemesProvider;
