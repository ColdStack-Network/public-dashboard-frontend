import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from "./containers/AuthPage/AuthPage";
import { Web3ReactProvider } from '@web3-react/core'
import UseWeb3, { getLibrary } from "./helpers/web3/UseWeb3";
import HomePage from "./containers/HomePage/HomePage";
import { checkAuth } from "./modules/user/actions";
import history from "./helpers/history";
import UseUpload from "./helpers/UseUpload";
import UploadFileModal from "./components/UI/Modal/UploadFileModal/UploadFileModal";
import { UploadMini } from "./components/UploadMini/UploadMini";
import ErrorBoundary from "./helpers/ErrorBoundary";
import GiftModal from './components/UI/Modal/GiftModal/GiftModal';
import { TStore } from './reducers';

const BucketsPage = lazy(() => import('./containers/BucketsPage/BucketsPage'));
const AccessKeysPage = lazy(() => import('./containers/AccessKeysPage/AccessKeysPage'));
const NotificationsPage = lazy(() => import('./containers/NotificationsPage/NotificationsPage'));
const BucketFilePage = lazy(() => import('./containers/BucketFilePage/BucketFilePage'));
const BillingPage = lazy(() => import('./containers/BillingPage/BillingPage'));
const SupportPage = lazy(() => import('./containers/SupportPage/SupportPage'));
const SettingsPage = lazy(() => import('./containers/SettingsPage/SettingsPage'));
const StorageClassesPage = lazy(() => import('./containers/StorageClassesPage/StorageClassesPage'));

const publicPaths = { '/serviceworker/redirect': '/redirect.html', '/redirect': '/redirect' };

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: TStore) => state.user.isAuthorized);
  const gift = useSelector((state: TStore) => state.user.gift);
  const { initWalletIfPossible, checkWalletAuth, invisibleActivate } = UseWeb3({ withLogic: true });
  const isPublicPath = publicPaths[window.location.pathname];

  if (isPublicPath) {
    window.location.replace(isPublicPath);
  }

  useEffect(() => {
    async function init() {
      await initWalletIfPossible();

      dispatch(checkAuth({ checkAuth: checkWalletAuth, invisibleActivate }));
    }

    init();
  }, []);
  const { modalUploadProps, uploadMiniProps, visibleUploadMini, isLoadingFiles } = UseUpload();

  useEffect(() => {
    const func = () => {
      return true
    }
    if (isLoadingFiles) {
      window.onbeforeunload = func;
    } else {
      window.onbeforeunload = null
    }

  }, [isLoadingFiles])


  return (
    <React.Fragment>

      {isAuthorized.checked === false ? <div /> :
        <BrowserRouter history={history}>
          <Layout isAuthorized={isAuthorized?.result}>
            <ErrorBoundary>
              <Suspense fallback={<div />}>
                <Switch>
                  <Route path="/serviceworker/redirect" exact>
                    {isPublicPath ? window.location.replace('/redirect.html') : null}
                  </Route>
                  <Route path="/connect" exact>
                    {isAuthorized.result ? <Redirect to="/" /> : () => {
                      return <AuthPage />
                    }}
                  </Route>
                  {!isAuthorized.result && !isPublicPath ? <Redirect to="/connect" /> : ""}
                  <Route path="/" exact >
                    <HomePage />
                  </Route>

                  <Route path="/buckets" exact>
                    <BucketsPage />
                  </Route>
                  <Route path={`/buckets/:bucketName`} component={BucketFilePage} />
                  <Route path="/accesskeys" exact>
                    <AccessKeysPage />
                  </Route>
                  <Route path="/storageClasses" exact >
                    <StorageClassesPage />
                  </Route>
                  <Route path="/notifications" exact >
                    <NotificationsPage />
                  </Route>
                  <Route path="/settings" exact>
                    <SettingsPage />
                  </Route>
                  <Route path="/billing" exact>
                    <BillingPage />
                  </Route>
                  <Route path="/support" exact>
                    <SupportPage />
                  </Route>
                </Switch>
              </Suspense>
            </ErrorBoundary>
            <UploadFileModal {...modalUploadProps} />
            <GiftModal visible={gift.showModal} onClose={() => {}} />
            {isAuthorized?.result && visibleUploadMini &&
              <UploadMini {...uploadMiniProps} />
            }
          </Layout>
        </BrowserRouter>

      }
    </React.Fragment>
  );
}

export default WrapApp;



function WrapApp() {
  console.log("2")
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )

}
