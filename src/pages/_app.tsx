import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import '../styles/UserForm.css';

/**
 * MyApp function is the root component for the Next.js application.
 * It wraps the entire application with the ClerkProvider for user authentication.
 * @author Allison Zhang and Walid Nejmi
 * @param {Object} props - The properties passed to the component.
 * @param {React.ComponentType} props.Component - The Next.js page component.
 * @param {Object} props.pageProps - The initial props that were preloaded for the page.
 * @returns {React.ReactElement} The rendered React element.
 */

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ClerkProvider {...pageProps}>
            <Component {...pageProps} />
        </ClerkProvider>
    );
}
export default MyApp;
