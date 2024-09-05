import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = "#1e1b4b";
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 5,
        },
        components: {
          Button: {
            controlHeight: 45,
            controlOutline: "none",
            colorBorder: primaryColor,
          },
          Input: {
            controlHeight: 45,
            controlOutline: "none",
          },
          Select: {
            controlHeight: 45,
            controlOutline: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
