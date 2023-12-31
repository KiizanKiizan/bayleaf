import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { createContext } from "react";
import { QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorPage } from "./components/baseParts/pages/ErrorPage";
import { LoaderPage } from "./components/baseParts/pages/LoaderPage";
import { useAppInitializer } from "./hooks/handler/app/useAppInitializer";
import Home from "./pages/Home";
import { BuyItem } from "./pages/buyItem/BuyItem";
import { Consult } from "./pages/consult/Consult";
import { Delivery } from "./pages/delivery/Delivery";
import { Dressing } from "./pages/dressing/Dressing";
import { Hearing } from "./pages/hearing/Hearing";
import { HearingAboutSize } from "./pages/hearingAboutSize/HearingAboutSize";
import { OneShot } from "./pages/oneShot/OneShot";
import { PaymentHistory } from "./pages/paymentHistory/PaymentHistory";
import { PlanChange } from "./pages/planChange/PlanChange";
import { PointHistory } from "./pages/pointHistory/PointHistory";
import { Review } from "./pages/review/Review";
import { Unsuspend } from "./pages/unsuspend/Unsuspend";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  release: process.env.REACT_APP_VERSION,
  tracesSampleRate: 0,
  environment: process.env.REACT_APP_ENV,
});

export const IdTokenContext = createContext("");

export const StylistIdContext = createContext<number | undefined>(undefined);

function App() {
  const { lineIdToken, stylistId, liffErrorMessage, queryClient } =
    useAppInitializer();
  const app = (
    <QueryClientProvider client={queryClient}>
      <IdTokenContext.Provider value={lineIdToken}>
        <StylistIdContext.Provider value={stylistId}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="review" element={<Review />} />
            <Route path="hearing" element={<Hearing />} />
            <Route path="consult" element={<Consult />} />
            <Route path="dressing" element={<Dressing />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="plan_change" element={<PlanChange />} />
            <Route path="unsuspend" element={<Unsuspend />} />
            <Route path="one_shot" element={<OneShot />} />
            <Route path="buy_items" element={<BuyItem />} />
            <Route path="payment_history" element={<PaymentHistory />} />
            <Route path="point_history" element={<PointHistory />} />
            <Route path="hearing_about_size" element={<HearingAboutSize />} />
          </Routes>
        </StylistIdContext.Provider>
      </IdTokenContext.Provider>
    </QueryClientProvider>
  );
  if (lineIdToken) {
    return (
      <Sentry.ErrorBoundary
        fallback={
          <ErrorPage message="予期せぬエラーが発生いたしました。大変申し訳ございませんが、再度お願いいたします" />
        }
        showDialog
      >
        {app}
      </Sentry.ErrorBoundary>
    );
  }
  if (liffErrorMessage) {
    return <ErrorPage message={liffErrorMessage} />;
  }
  return <LoaderPage caption="ログイン中" />;
}

export default App;
