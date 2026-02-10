import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  setupIonicReact,
  IonButton
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, compass, paperPlane, logOut, person } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Requests from './pages/Requests';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const Menu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding ion-text-center">
            {user && (
                <>
                    <IonIcon icon={person} size="large" />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </>
            )}
        </div>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/app/dashboard">
              <IonIcon slot="start" icon={home} />
              <IonLabel>Dashboard</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/explore">
              <IonIcon slot="start" icon={compass} />
              <IonLabel>Explore Skills</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/requests">
              <IonIcon slot="start" icon={paperPlane} />
              <IonLabel>My Requests</IonLabel>
            </IonItem>
            <IonItem button onClick={() => dispatch(logout())}>
              <IonIcon slot="start" icon={logOut} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/app/explore">
          <Explore />
        </Route>
        <Route exact path="/app/requests">
          <Requests />
        </Route>
        <Route exact path="/app">
          <Redirect to="/app/dashboard" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/app/dashboard">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="explore" href="/app/explore">
          <IonIcon aria-hidden="true" icon={compass} />
          <IonLabel>Explore</IonLabel>
        </IonTabButton>
        <IonTabButton tab="requests" href="/app/requests">
          <IonIcon aria-hidden="true" icon={paperPlane} />
          <IonLabel>Requests</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenuToggle>
            {/* Helper to ensure menu works */}
        </IonMenuToggle>
        <Menu />
        <IonRouterOutlet id="main">
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/app/dashboard" /> : <Login />}
          </Route>
          <Route exact path="/signup">
             {isAuthenticated ? <Redirect to="/app/dashboard" /> : <Signup />}
          </Route>
          <Route path="/app">
            {isAuthenticated ? <MainTabs /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            <Redirect to="/app" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
