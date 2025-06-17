"use client"

import { clientEnv } from "@/config/clientEnv";
import { ENSProvider } from "@/providers/ENSProvider";
import { SidebarProvider } from "@ensvolution/ui/components/sidebar";
import { EFPPlugin } from "@justweb3/efp-plugin";
import { POAPPlugin } from "@justweb3/poap-plugin";
import { TalentProtocolPlugin } from "@justweb3/talent-protocol-plugin";
import { JustWeb3Provider, JustWeb3ProviderConfig } from "@justweb3/widget";
import '@justweb3/widget/styles.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { mainnet } from "viem/chains";
import { createConfig, http, WagmiProvider } from "wagmi";

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    // @ts-ignore
    const config = createConfig({
        chains: [mainnet],
        transports: {
            [mainnet.id]: http(clientEnv.mainnetProvider),
        },
    })

    const justweb3config: JustWeb3ProviderConfig = {
        networks: [{
            chainId: 1,
            providerUrl: clientEnv.mainnetProvider
        }],
        config: {
            subnameChallengeTtl: 1000 * 60 * 60 * 24 * 30,
        },
        plugins: [TalentProtocolPlugin(), POAPPlugin(), EFPPlugin],
        openOnWalletConnect: false,
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
