import { IonFooter, IonToolbar, IonTitle } from '@ionic/react';

const Footer = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonTitle size="small" className="ion-text-center text-sm text-medium">
          © 2026 SkillLoop. All rights reserved.
        </IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
