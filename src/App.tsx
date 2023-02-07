import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from "./containers/AuthPage/AuthPage";
import { Web3ReactProvider } from "@web3-react/core";
import { myWeb3, useWeb3 } from "helpers/web3/useWeb3";
import HomePage from "./containers/HomePage/HomePage";
import { checkAuth } from "Redux/user/Actions/userActions";
import { UploadFileModal } from "./components/UI/Modal/UploadFileModal/UploadFileModal";
import { UploadMini } from "components/UploadMini/UploadMini";
import ErrorBoundary from "./helpers/ErrorBoundary";
import GiftModal from "./components/UI/Modal/GiftModal/GiftModal";
import { selectIsAuthorized } from "Redux/user/Selectors/selectIsAuthoraized";
import { selectGift } from "Redux/user/Selectors/selectGift";
import { useUpload } from "helpers/UseUpload";
import { selectRedirectUrl } from "Redux/user/Selectors/selectRedirectUrl";
import LandingPage from "./containers/LandingPage/LandingPage";
import { debounce } from "lodash";
import { setIsMob } from "Redux/ui/uiActions";
import { AppConfig } from "config";
import { TechnicalPage } from "containers/TechnicalPage/TechnicalPage";
import { Spinner } from "components/UI/Spinner/Spinner";
import { Cookie } from "helpers/cookie";
import { SuccessModal } from "components/UI/Modal/SuccessModal/SuccessModal";
import { LocalStorage } from "./helpers/localStorage";
import { deleteToken } from "./helpers/common";
import { StoredWallet } from "./models/StoredWallet";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const TermsOfService = lazy(() => import("./containers/TermsOfService/TermsOfService"));
const LottoWinnerPage = lazy(() => import("./containers/LottoWinnerPage/LottoWinnerPage"));
const AcceptableUsePolicy = lazy(() => import("./containers/AcceptableUsePolicy/AcceptableUsePolicy"));
const ServiceLevelAgreement = lazy(() => import("./containers/ServiceLevelAgreement/ServiceLevelAgreement"));
const CookiesPolicy = lazy(() => import("./containers/CookiesPolicy/CookiesPolicy"));
const PrivacyPolicy = lazy(() => import("./containers/PrivacyPolicy/PrivacyPolicy"));
const BucketsPage = lazy(() => import("./containers/BucketsPage/BucketsPage"));
const AccessKeysPage = lazy(() => import("./containers/AccessKeysPage/AccessKeysPage"));
const NotificationsPage = lazy(() => import("./containers/NotificationsPage/NotificationsPage"));
const BucketFilePage = lazy(() => import("./containers/BucketFilePage/BucketFilePage"));
const BillingPage = lazy(() => import("./containers/BillingPage/BillingPage"));
const SupportPage = lazy(() => import("./containers/SupportPage/SupportPage"));
const SettingsPage = lazy(() => import("./containers/SettingsPage/SettingsPage"));
const StorageClassesPage = lazy(() => import("./containers/StorageClassesPage/StorageClassesPage"));
const MigrationPage = lazy(() => import("./containers/MigrationPage/Migration"));
const EcoSystemPage = lazy(() => import("./containers/EcoSystemPage/EcoSystemPage"));
const SolutionsPage = lazy(() => import("./containers/SolutionsPage/SolutionsPage"));
const PricePage = lazy(() =>
  import("./containers/PricePage/PricePage").then((module) => ({ default: module.PricePage }))
);
const AboutPage = lazy(() =>
  import("./containers/AboutPage/AboutPage").then((module) => ({ default: module.AboutPage }))
);
const StakingPage = lazy(() =>
  import("./containers/StakingPage/StakingPage").then((module) => ({ default: module.StakingPage }))
);
const publicPaths = { "/redirect": "/redirect" };

const IN_TECH = AppConfig.technicalProcess;
const DISABLE_TECH = !!Cookie.getCookie("dont_show_popup");
const SHOW_TECH = !DISABLE_TECH && IN_TECH;

// const isDev = !AppConfig.isProd;

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const gift = useSelector(selectGift);
  const { initWalletIfPossible, checkWalletAuth, invisibleActivate, initWeb3, active } = useWeb3({ withLogic: true });
  const isPublicPath = publicPaths[window.location.pathname];
  const redirectUrl = useSelector(selectRedirectUrl);

  if (isPublicPath) {
    window.location.replace(isPublicPath);
  }

  useEffect(() => {
    const init = async () => {
      await initWalletIfPossible();
      const walletLocal = LocalStorage.getItem<StoredWallet>("wallet");
      const walletConnectLocal = LocalStorage.getItem<any>("walletconnect");
      const walletName = walletLocal && typeof walletLocal !== "string" ? walletLocal.name : "";
      if (walletName === "walletconnect" && !walletConnectLocal?.connected && !active) {
        deleteToken();
        LocalStorage.deleteItem("wallet");
      }
      dispatch(checkAuth({ checkAuth: checkWalletAuth, invisibleActivate }));
    };

    !SHOW_TECH && init();
  }, [checkWalletAuth, initWalletIfPossible, invisibleActivate, dispatch, active]);

  useEffect(() => {
    initWeb3();
  }, [initWeb3]);

  const { modalUploadProps, uploadMiniProps, visibleUploadMini, isLoadingFiles } = useUpload();

  useEffect(() => {
    const func = () => {
      return true;
    };
    if (isLoadingFiles) {
      window.onbeforeunload = func;
    } else {
      window.onbeforeunload = null;
    }
  }, [isLoadingFiles]);

  useEffect(() => {
    const onResize = debounce(() => {
      const width = window.innerWidth;
      dispatch(setIsMob(width <= 767.9));
    }, 200);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [dispatch]);

  if (!SHOW_TECH && !isAuthorized.checked)
    return (
      <div className="page-loading">
        <Spinner />
      </div>
    );
  if (SHOW_TECH) {
    return (
      <BrowserRouter>
        <Switch>
          <TechnicalPage />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <React.Fragment>
      <BrowserRouter>
        <ScrollToTop>
          <Layout isAuthorized={isAuthorized?.result}>
            <ErrorBoundary>
              <Suspense fallback={<div />}>
                <Switch>
                  <Route path="/solutions/" exact>
                    <SolutionsPage />
                  </Route>
                  <Route path="/pricing/" exact>
                    <PricePage />
                  </Route>
                  <Route path="/about/" exact>
                    <AboutPage />
                  </Route>
                  <Route path="/" exact>
                    <LandingPage />
                  </Route>
                  <Route path="/terms-and-conditions/" exact>
                    <TermsOfService />
                  </Route>
                  <Route path="/aup/" exact>
                    <AcceptableUsePolicy />
                  </Route>
                  <Route path="/sla/" exact>
                    <ServiceLevelAgreement />
                  </Route>
                  <Route path="/cookie-policy/" exact>
                    <CookiesPolicy />
                  </Route>
                  <Route path="/privacy-policy/" exact>
                    <PrivacyPolicy />
                  </Route>
                  <Route path="/ecosystem/" exact>
                    <EcoSystemPage />
                  </Route>
                  <Route path="/migration/" exact>
                    <MigrationPage />
                  </Route>
                  <Route path="/lotto/" exact>
                    <LottoWinnerPage />
                  </Route>
                  <Route path="/auth/" exact>
                    {isAuthorized.result && !redirectUrl ? <Redirect to="/dashboard/" /> : <AuthPage />}
                  </Route>
                  {!isAuthorized.result && !isPublicPath && <Redirect to="/auth/" />}
                  <Route path="/dashboard/" exact>
                    <HomePage />
                  </Route>
                  <Route path="/dashboard/buckets" exact>
                    <BucketsPage />
                  </Route>
                  <Route path="/dashboard/staking">
                    <StakingPage />
                  </Route>
                  <Route path={`/dashboard/buckets/:bucketName`} component={BucketFilePage} />
                  <Route path="/dashboard/accesskeys" exact>
                    <AccessKeysPage />
                  </Route>
                  <Route path="/dashboard/storageClasses" exact>
                    <StorageClassesPage />
                  </Route>
                  <Route path="/dashboard/notifications" exact>
                    <NotificationsPage />
                  </Route>
                  <Route path="/dashboard/settings" exact>
                    <SettingsPage />
                  </Route>
                  <Route path="/dashboard/billing" exact>
                    <BillingPage />
                  </Route>
                  <Route path="/dashboard/support" exact>
                    <SupportPage />
                  </Route>
                </Switch>
              </Suspense>
            </ErrorBoundary>
            <SuccessModal />
            <UploadFileModal {...modalUploadProps} />
            <GiftModal visible={gift.showModal} onClose={() => {}} />
            {isAuthorized?.result && visibleUploadMini && <UploadMini {...uploadMiniProps} />}
          </Layout>
        </ScrollToTop>
      </BrowserRouter>
    </React.Fragment>
  );
}

function WrapApp() {
  return (
    <Web3ReactProvider getLibrary={() => myWeb3}>
      <App />
    </Web3ReactProvider>
  );
}

export default WrapApp;
