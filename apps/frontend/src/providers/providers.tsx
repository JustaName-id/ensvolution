"use client"

import * as React from "react"
import {ThemeProvider as NextThemesProvider} from "next-themes"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {JustWeb3Provider, JustWeb3ProviderConfig} from "@justweb3/widget";
import '@justweb3/widget/styles.css'
import {TalentProtocolPlugin} from "@justweb3/talent-protocol-plugin";
import {POAPPlugin} from "@justweb3/poap-plugin";
import {EFPPlugin} from "@justweb3/efp-plugin";
import {createConfig, http, WagmiProvider} from "wagmi";
import {mainnet} from "viem/chains";
import {ReactFlowProvider} from "@xyflow/react";
import {ENSProvider} from "@/providers/ENSProvider";
import {SidebarProvider} from "@ensvolution/ui/components/sidebar";

const queryClient = new QueryClient()

export function Providers({children}: { children: React.ReactNode }) {
    // @ts-ignore
  const config = createConfig({
        chains: [mainnet],
        transports: {
            [mainnet.id]: http("https://eth.merkle.io"),
        },
    })

    const justweb3config: JustWeb3ProviderConfig = {
        networks: [{
            chainId: 1,
            providerUrl: "https://eth.merkle.io"
        }],
        config: {
            subnameChallengeTtl: 1000 * 60 * 60 * 24 * 30,
        },
        plugins: [TalentProtocolPlugin(), POAPPlugin(), EFPPlugin],
        openOnWalletConnect:false,
    }

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                    <JustWeb3Provider config={justweb3config}>
                          <ENSProvider>
                              <NextThemesProvider
                                  attribute="class"
                                  defaultTheme="system"
                                  enableSystem
                                  disableTransitionOnChange
                                  enableColorScheme
                              >
                                  <SidebarProvider defaultOpen={false}>
                                      {children}
                                  </SidebarProvider>
                              </NextThemesProvider>
                          </ENSProvider>
                    </JustWeb3Provider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
