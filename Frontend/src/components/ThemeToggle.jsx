import { IonIcon, IonButton } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage only
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.body.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <IonButton fill="clear" onClick={toggleTheme}>
      <IonIcon slot="icon-only" icon={isDark ? sunny : moon} />
    </IonButton>
  );
};

export default ThemeToggle;
