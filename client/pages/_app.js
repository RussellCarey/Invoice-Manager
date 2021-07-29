import "../styles/globals.css";

import UIState from "../context/ui/UIState";

function MyApp({ Component, pageProps }) {
  return (
    <UIState>
      <Component {...pageProps} />
    </UIState>
  );
}

export default MyApp;
