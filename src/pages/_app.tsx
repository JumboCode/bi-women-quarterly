import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

/**
 * Prepares a car to race: fills up the tank and tests the engine
 * @author Your Name
 * @param car the car to prepare
 * @param raceType the type of race to prepare for
 * @returns cost of the preparation process in USD
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
export default MyApp;