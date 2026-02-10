import { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonToast,
  IonLoading,
  IonIcon
} from '@ionic/react';
import { personOutline, mailOutline, callOutline, lockClosedOutline, personAddOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerUser, clearError } from '../redux/slices/authSlice';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignup = async () => {
    if (!name || !email || !phone || !password) {
        return;
    }

    const resultAction = await dispatch(registerUser({ name, email, phone, password }));
    if (registerUser.fulfilled.match(resultAction)) {
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
                <IonText color="primary">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                </IonText>
                <IonText color="medium">
                    <p>Join SkillLoop today</p>
                </IonText>
            </div>

            <div className="space-y-6">
                <IonInput
                    label="Full Name"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="John Doe"
                    value={name}
                    onIonChange={(e) => setName(e.detail.value)}
                    className="mb-6 ion-margin-bottom"
                >
                    <IonIcon slot="start" icon={personOutline} aria-hidden="true" />
                </IonInput>

                <IonInput
                    label="Email"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="john@example.com"
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value)}
                     className="mb-6 ion-margin-bottom"
                >
                    <IonIcon slot="start" icon={mailOutline} aria-hidden="true" />
                </IonInput>

                <IonInput
                    label="Phone"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="1234567890"
                    type="tel"
                    value={phone}
                    onIonChange={(e) => setPhone(e.detail.value)}
                     className="mb-6 ion-margin-bottom"
                >
                    <IonIcon slot="start" icon={callOutline} aria-hidden="true" />
                </IonInput>

                <IonInput
                    label="Password"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="******"
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value)}
                     className="mb-6"
                >
                    <IonIcon slot="start" icon={lockClosedOutline} aria-hidden="true" />
                </IonInput>

                <IonButton expand="block" shape="round" onClick={handleSignup} className="mt-6 h-12">
                     <IonIcon slot="start" icon={personAddOutline} />
                    Sign Up
                </IonButton>
                
                <IonButton expand="block" fill="clear" routerLink="/login" className="mt-2">
                    Already have an account? Login
                </IonButton>
            </div>
        </div>

        <IonLoading isOpen={loading} message={'Creating account...'} spinner="crescent" />
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

export default Signup;
