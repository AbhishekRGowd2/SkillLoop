import { 
  IonContent, 
  IonPage, 
  IonSearchbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
  IonLabel,
  IonTextarea,
  IonIcon,
  IonBadge,
  IonChip,
  useIonToast
} from '@ionic/react';
import { paperPlaneOutline, closeOutline, timeOutline, personOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { fetchSkills } from '../redux/slices/skillSlice';
import { createRequest, clearRequestSuccess } from '../redux/slices/requestSlice';

const Explore = () => {
  const dispatch = useDispatch();
  const { items: skills, loading } = useSelector(state => state.skills);
  const { user } = useSelector(state => state.auth);
  const { success: requestSuccess, error: requestError } = useSelector(state => state.requests);

  const [present] = useIonToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  useEffect(() => {
    if (requestSuccess) {
      present({
        message: requestSuccess,
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      setShowRequestModal(false);
      setMessage('');
      dispatch(clearRequestSuccess());
    }
    if (requestError) {
        present({
            message: requestError,
            duration: 3000,
            color: 'danger',
            position: 'top'
        });
    }
  }, [requestSuccess, requestError, dispatch, present]);

  const handleOpenRequest = (skill) => {
    setSelectedSkill(skill);
    setShowRequestModal(true);
  };

  const handleSendRequest = () => {
      if(!selectedSkill) return;
      
      const requestData = {
          skillId: selectedSkill._id,
          toUserId: selectedSkill.userId._id, // Ensure your populate returns this structure
          message: message
      };
      
      dispatch(createRequest(requestData));
  };

  const filteredSkills = skills.filter(skill => 
    skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
      <Header title="Explore Skills" />
      <IonContent fullscreen className="ion-padding">
        <IonSearchbar 
            value={searchTerm} 
            onIonInput={(e) => setSearchTerm(e.detail.value)} 
            placeholder="Search skills by title or category..."
        ></IonSearchbar>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {filteredSkills.map(skill => (
                <IonCard key={skill._id} className="m-2">
                    <IonCardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <IonCardSubtitle className="uppercase tracking-wide text-sm font-semibold text-blue-500">
                                    {skill.category}
                                </IonCardSubtitle>
                                <IonCardTitle className="mt-1 text-xl font-bold">
                                    {skill.title}
                                </IonCardTitle>
                             </div>
                             <IonChip color={skill.experienceLevel === 'Expert' ? 'danger' : skill.experienceLevel === 'Intermediate' ? 'warning' : 'success'}>
                                 {skill.experienceLevel}
                             </IonChip>
                        </div>
                    </IonCardHeader>
                    <IonCardContent>
                        <p className="mb-4 text-medium">
                            {skill.description}
                        </p>
                        
                        <div className="flex items-center space-x-2 text-sm text-medium mb-4">
                            <IonIcon icon={personOutline} />
                            <span>Offered by: {skill.userId?.name || 'Unknown'}</span>
                        </div>

                        {skill.availability && (
                            <div className="mb-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <IonIcon icon={timeOutline} />
                                    <span>Available: {skill.availability.days?.join(', ')}</span>
                                </div>
                            </div>
                        )}

                        {user?._id !== skill.userId?._id && (
                             <IonButton expand="block" onClick={() => handleOpenRequest(skill)}>
                                <IonIcon slot="start" icon={paperPlaneOutline} />
                                Request Skill
                            </IonButton>
                        )}
                    </IonCardContent>
                </IonCard>
            ))}
            
            {filteredSkills.length === 0 && !loading && (
                <div className="ion-text-center ion-padding w-full col-span-full">
                    <p>No skills found matching your search.</p>
                </div>
            )}
        </div>

        <IonModal isOpen={showRequestModal} onDidDismiss={() => setShowRequestModal(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Request {selectedSkill?.title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowRequestModal(false)}>
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Message (Optional)</IonLabel>
                    <IonTextarea 
                        rows={6} 
                        placeholder="Hi, I'd like to learn this skill..."
                        value={message}
                        onIonChange={e => setMessage(e.detail.value)}
                    ></IonTextarea>
                </IonItem>
                <div className="ion-padding">
                    <IonButton expand="block" onClick={handleSendRequest}>
                        Send Request
                    </IonButton>
                </div>
            </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Explore;
