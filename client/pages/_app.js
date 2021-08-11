import "../styles/globals.css";

import UIState from "../context/ui/UIState";
import InvoiceState from "../context/invoices/InvoiceState";

function MyApp({ Component, pageProps }) {
  return (
    <InvoiceState>
      <UIState>
        <Component {...pageProps} />
      </UIState>
    </InvoiceState>
  );
}

export default MyApp;
