import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OfferSkillModal from '../components/OfferSkillModal';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [showOfferModal, setShowOfferModal] = useState(false);

  return (
    <IonPage>
      <Header title="Dashboard" />
      <IonContent fullscreen className="ion-padding">
        
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="ion-text-center ion-margin-top">
                 <h1 className="text-3xl font-bold">
                    Hello, <span className="gradient-text">{user?.name}</span>!
                 </h1>
                 <p className="text-medium text-lg">
                    Welcome back to SkillLoop.
                 </p>
            </div>

            <IonCard className="welcome-card-bg mt-6 shadow-md border-0">
                <IonCardHeader>
                    <IonCardTitle>Quick Actions</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p className="mb-6">
                        Looking to expand your horizons? Explore new skills or share your own.
                    </p>
                    
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeMd="6">
                                <IonButton expand="block" size="large" className="action-card" onClick={() => setShowOfferModal(true)}>
                                    <IonIcon slot="start" icon={addCircleOutline} />
                                    Offer a Skill
                                </IonButton>
                            </IonCol>
                            <IonCol size="12" sizeMd="6">
                                <IonButton expand="block" fill="outline" size="large" className="action-card" routerLink="/app/explore">
                                    Browse Skills
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        </div>

        <OfferSkillModal isOpen={showOfferModal} onClose={() => setShowOfferModal(false)} />

      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Dashboard;
