import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "../src/lib/apollo/apollo-client";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ApolloProvider } from "@apollo/client";

import { publicProvider } from "wagmi/providers/public";
import App from "./App";
import "./index.css";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";

// library.add(faXmarkSquare);

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai,

    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true"
      ? [chain.polygonMumbai]
      : []),
  ],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.LIVE_API_KEY,
  }),
});
const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient()}>
      <WagmiConfig client={wagmiClient}>
        <LivepeerConfig client={livepeerClient}>
          <RainbowKitProvider chains={chains}>
            <BrowserRouter>
              <App />
            </BrowserRouter>{" "}
          </RainbowKitProvider>
        </LivepeerConfig>{" "}
      </WagmiConfig>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
