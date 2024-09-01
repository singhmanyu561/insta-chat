import React from 'react'
import { ConfigProvider } from 'antd'

function ThemeProvider({children}:{children: React.ReactNode}) {
  return (
    <ConfigProvider theme={{
        token: {
            borderRadius: 5
        },
        components: {
            Button: {
                controlHeight: 45
            }
        }
    }}>
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
