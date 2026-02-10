import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';
import ThemeToggle from './ThemeToggle';

const Header = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <ThemeToggle />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
