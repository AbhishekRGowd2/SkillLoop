import { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonToast,
  IonLoading,
  IonItem,
  IonIcon
} from '@ionic/react';
import { lockClosedOutline, mailOutline, logInOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser, clearError } from '../redux/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      return; 
    }
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      history.push('/app/dashboard'); 
    } else {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="flex flex-col h-full justify-center max-w-md mx-auto">
          <div className="ion-text-center mb-8">
            <IonIcon icon={lockClosedOutline} style={{ fontSize: '4rem', color: 'var(--ion-color-primary)' }} />
            <IonText color="primary">
              <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>
            </IonText>
            <IonText color="medium">
              <p>Sign in to continue to SkillLoop</p>
            </IonText>
          </div>

          <div className="space-y-4">
            <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter your email"
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value)}
                className="mb-4"
            >
                <IonIcon slot="start" icon={mailOutline} aria-hidden="true" />
            </IonInput>

            <IonInput
                label="Password"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter your password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value)}
                className="mb-6"
            >
                 <IonIcon slot="start" icon={lockClosedOutline} aria-hidden="true" />
            </IonInput>

            <IonButton expand="block" shape="round" onClick={handleLogin} className="mt-6 h-12">
              <IonIcon slot="start" icon={logInOutline} />
              Login
            </IonButton>
            
            <IonButton expand="block" fill="clear" routerLink="/signup" className="mt-2">
              Don't have an account? Sign Up
            </IonButton>
          </div>
        </div>

        <IonLoading isOpen={loading} message={'Logging in...'} spinner="crescent" />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => {
            setShowToast(false);
            dispatch(clearError());
          }}
          message={error}
          duration={3000}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
