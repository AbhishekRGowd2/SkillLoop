import { 
    IonModal, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonText,
    IonInput, 
    IonSelect, 
    IonSelectOption, 
    IonTextarea,
    useIonToast 
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSkill, fetchSkills } from '../redux/slices/skillSlice';

const OfferSkillModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [present] = useIonToast();

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('Beginner');
    const [days, setDays] = useState(''); // Comma separated for simplicity

    const handleSubmit = async () => {
        if(!category || !title || !description) {
            present({
                message: 'Please fill in all required fields.',
                color: 'warning',
                duration: 2000
            });
            return;
        }

        const skillData = {
            category,
            title,
            description,
            experienceLevel,
            availability: {
                days: days.split(',').map(d => d.trim()).filter(d => d)
            }
        };

        const result = await dispatch(createSkill(skillData));
        
        if (createSkill.fulfilled.match(result)) {
            present({
                message: 'Skill offered successfully!',
                color: 'success',
                duration: 2000
            });
            dispatch(fetchSkills()); // Refresh list
            onClose();
            // Reset form
            setCategory('');
            setTitle('');
            setDescription('');
            setDays('');
        } else {
             present({
                message: 'Failed to offer skill.',
                color: 'danger',
                duration: 2000
            });
        }
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Offer a Skill</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="space-y-6 pt-4">
                    <div className="ion-text-center mb-6">
                        <IonText color="primary">
                            <h2 className="text-2xl font-bold">Share Your Expertise</h2>
                        </IonText>
                        <IonText color="medium">
                            <p>Fill in the details below to offer a new skill.</p>
                        </IonText>
                    </div>

                    <IonInput 
                        label="Skill Title" 
                        labelPlacement="floating" 
                        fill="outline"
                        placeholder="e.g., React Development"
                        value={title}
                        onIonChange={e => setTitle(e.detail.value)}
                        className="mb-4 ion-margin-bottom"
                    />

                    <IonInput 
                        label="Category" 
                        labelPlacement="floating" 
                        fill="outline"
                        placeholder="e.g., Programming"
                        value={category}
                        onIonChange={e => setCategory(e.detail.value)}
                        className="mb-4 ion-margin-bottom"
                    />

                    <IonSelect 
                        label="Experience Level" 
                        labelPlacement="floating" 
                        fill="outline"
                        value={experienceLevel} 
                        onIonChange={e => setExperienceLevel(e.detail.value)}
                        className="mb-4 ion-margin-bottom"
                    >
                        <IonSelectOption value="Beginner">Beginner</IonSelectOption>
                        <IonSelectOption value="Intermediate">Intermediate</IonSelectOption>
                        <IonSelectOption value="Expert">Expert</IonSelectOption>
                    </IonSelect>

                    <IonInput 
                        label="Availability (Days)" 
                        labelPlacement="floating" 
                        fill="outline"
                        placeholder="e.g., Mon, Wed, Fri"
                        value={days}
                        onIonChange={e => setDays(e.detail.value)}
                        className="mb-4 ion-margin-bottom"
                    />

                    <IonTextarea 
                        label="Description" 
                        labelPlacement="floating" 
                        fill="outline"
                        rows={4}
                        placeholder="Describe what you can teach..."
                        value={description}
                        onIonChange={e => setDescription(e.detail.value)}
                        className="mb-6 ion-margin-bottom"
                    />

                    <IonButton expand="block" className="mt-6" onClick={handleSubmit}>
                        Submit Skill
                    </IonButton>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default OfferSkillModal;
