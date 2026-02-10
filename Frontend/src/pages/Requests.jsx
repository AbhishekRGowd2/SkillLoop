import { 
    IonContent, 
    IonPage, 
    IonSegment, 
    IonSegmentButton, 
    IonLabel, 
    IonList, 
    IonItem, 
    IonText, 
    IonBadge, 
    IonButton,
    useIonToast
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { fetchRequests, updateRequestStatus } from '../redux/slices/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const { items: requests, loading } = useSelector(state => state.requests);
    const { user } = useSelector(state => state.auth);
    const [segment, setSegment] = useState('received');
    const [present] = useIonToast();

    useEffect(() => {
        dispatch(fetchRequests());
    }, [dispatch]);

    const handleStatusUpdate = async (id, status) => {
        const result = await dispatch(updateRequestStatus({ id, status }));
        if(updateRequestStatus.fulfilled.match(result)){
            present({
                message: `Request ${status.toLowerCase()}!`,
                color: 'success',
                duration: 2000
            });
        }
    };

    const filteredRequests = requests.filter(req => {
        if (segment === 'received') {
            return req.toUserId?._id === user?._id || req.toUserId === user?._id;
        } else {
            return req.fromUserId?._id === user?._id || req.fromUserId === user?._id;
        }
    });

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return 'warning';
            case 'Accepted': return 'success';
            case 'Rejected': return 'danger';
            case 'Completed': return 'primary';
            default: return 'medium';
        }
    };

  return (
    <IonPage>
      <Header title="My Requests" />
      <IonContent fullscreen className="ion-padding">
        
        <div className="max-w-4xl mx-auto">
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value)} className="mb-4">
                <IonSegmentButton value="received">
                    <IonLabel>Received</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="sent">
                    <IonLabel>Sent</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            <IonList>
                {filteredRequests.map(req => (
                    <IonItem key={req._id} lines="full" className="mb-2 rounded-lg" style={{ '--border-color': 'var(--ion-color-medium-tint)' }}>
                        <div className="py-2 w-full">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold">{req.skillId?.title} <span className="text-sm font-normal text-medium">({req.skillId?.category})</span></h3>
                                <IonBadge color={getStatusColor(req.status)}>{req.status}</IonBadge>
                            </div>
                            
                            <p className="text-sm text-medium mb-2">
                                {segment === 'received' 
                                    ? `Request from: ${req.fromUserId?.name}` 
                                    : `Request to: ${req.toUserId?.name}`}
                            </p>
                            
                            {req.message && (
                                <p className="text-sm italic text-gray-500 mb-3">"{req.message}"</p>
                            )}
                            
                            <div className="flex space-x-2 mt-2 justify-end">
                                {segment === 'received' && req.status === 'Pending' && (
                                    <>
                                        <IonButton size="small" color="success" onClick={() => handleStatusUpdate(req._id, 'Accepted')}>
                                            Accept
                                        </IonButton>
                                        <IonButton size="small" color="danger" onClick={() => handleStatusUpdate(req._id, 'Rejected')}>
                                            Reject
                                        </IonButton>
                                    </>
                                )}
                                
                                {segment === 'sent' && req.status === 'Accepted' && (
                                     <IonButton size="small" color="primary" onClick={() => handleStatusUpdate(req._id, 'Completed')}>
                                        Mark Completed
                                    </IonButton>
                                )}
                            </div>
                        </div>
                    </IonItem>
                ))}

                {filteredRequests.length === 0 && !loading && (
                    <div className="ion-text-center ion-padding mt-8">
                        <IonText color="medium">
                            <p>No {segment} requests found.</p>
                        </IonText>
                    </div>
                )}
            </IonList>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Requests;
