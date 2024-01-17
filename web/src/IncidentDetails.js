// IncidentDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, onSnapshot  } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { incidentsCollection, storage, db } from './firebase';

import Map from './Map';

const IncidentDetails = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [realTimeStatus, setRealTimeStatus] = useState(null);

  const handleStatusChange = async (newStatus) =>{
    const incidentDocRef = doc(db, 'incident', id);

    console.log('Updating incident document with ID:', id);

    await updateDoc(incidentDocRef, {
       state : newStatus,
    });

    console.log('Incident document updated successfully.');
  }

  useEffect(() => {
    const getIncidentById = async (incidentId) => {
      try {
        const incidentDoc = doc(incidentsCollection, incidentId);
        const incidentSnapshot = await getDoc(incidentDoc);

        const unsubscribe = onSnapshot(incidentDoc, (doc) => {
          if (doc.exists()) {
            const incidentData = doc.data();
            const date = new Date(incidentData.date);

            const formattedDate = date.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              timeZone: 'UTC', // Assuming the date is in UTC
            });

          // Additional logic if you need to fetch associated image data
          //   const downloadURL = await getDownloadURL(ref(storage, incidentData.imageUrl));


            setRealTimeStatus(incidentData.state);

            const updatedIncident  = {
              id: incidentSnapshot.id,
              date: formattedDate,
              image: incidentData.imageUrl,
              data: incidentData,
            };

        //   console.log(incidentDetails.data.location.latitude)

            setIncident(updatedIncident);
          }
          else {
            console.error('Incident not found');
          }
        });
        return () => {
          // Unsubscribe from real-time updates when the component unmounts
          unsubscribe();
        };  
      } catch (error) {
        console.error('Error getting incident by ID:', error.message);
      }
    };

    getIncidentById(id); // Fetch incident data when the component mounts
  }, [id]);

  if (!incident) {
    // Loading state or error handling can be added here
    return <div>Loading...</div>;
  }

  const statusOptions = ['in progress', 'evaluated', 'finished'];
  
    const handleInputChange = async (newStatus) =>{
      const incidentDocRef = doc(db, 'incident', id);

      await updateDoc(incidentDocRef, {
        comment : newStatus,
     });
    };

  return (
    <div className='content'>
        <div className="min-height-300 bg-primary position-absolute w-100">
          <div 
            className="container position-sticky z-index-sticky min-height-100"
            style={{display: "flex",
                    justifyContent: "space-between"}}>
            <h1 
                className="mt-3"
                style={{color: "white",
                        fontSize: "4rem",
                        display: "inline-block"}}>Incident details</h1>
            <a 
              href="/Dashboard"
              style={{display: "flex",
                      alignItems: "center"}}>
              <img
                className="mt-3"
                src={process.env.PUBLIC_URL + '/assets/home.svg'} 
                alt="Home"/>
            </a>
          </div>
        </div>
        <main className='main-content position-relative border-radius-lg ps'>
            <div className="container position-sticky z-index-sticky top-0">
                <header className="mt-11">
                    <h2 className="text-white">
                        Incident: {incident.data.description}
                    </h2>
                </header>
                <div className='row'>
                  <div className="col-xl-6 col-sm-12 mb-xl-0 mb-4">
                    <div className="d-flex flex-column mt-6">
                        <span className="mb-2 text-sm">ID: <span className="text-dark ms-sm-2 font-weight-bold">{incident.id}</span></span>
                        <span className="mb-2 text-sm">Category: <span className="text-dark ms-sm-2 font-weight-bold">{incident.data.category}</span></span>
                        <span className="mb-2 text-sm">Added By: <span className="text-dark font-weight-bold ms-sm-2">{incident.data.userID}</span></span>
                        <span className="mb-2 text-sm">Added At: <span className="text-dark ms-sm-2 font-weight-bold">{incident.date}</span></span>
                        <div className="d-flex align-items-center mb-2">
                        <span className="mr-2 text-sm">
                          Status:{' '}
                        </span>
                        <select
                          className="form-select"
                          value={incident.data.state}
                          onChange={(e) => handleStatusChange(e.target.value)}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        </div>
                        <span className="mr-2 text-sm">
                          Comment:
                        </span>
                        <textarea
                          value={incident.data.comment}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className='mb-2 border-radius-lg'
                          placeholder="Type something here..."
                          rows={5}
                          cols={50}
                          style={{resize: 'none',
                                  maxWidth: "550px",
                                  outlineColor: "#5e72e4",
                                  borderColor: "#d2d6da"}}
                        />
                        <p>Text will be automatically saved after leaving the text box.</p>
                        <div className='mt-3'>
                        <Map latitude={incident.data.location.latitude} longitude={incident.data.location.longitude} />
                        </div>
                    </div>
                  </div>
                    <div className="col-xl-6 col-sm-12 mb-xl-0 mb-4">
                    <div className="d-flex flex-column mt-6 text-end">
                        <div className='normal-picture'>
                            {/* <img src={incident.image} alt={incident.data.description} /> */}
                            <a href={incident.image} target="_blank" rel="noopener noreferrer">
                              <img src={incident.image} alt={incident.data.description} />
                            </a>
                            {/* <p>{incident.data.description}</p> */}
                        </div>
                    </div>
                  </div>
                        {/* <a className="btn btn-link text-danger text-gradient px-3 mb-0" href="/"><i className="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a> */}
                        {/* <a className="btn btn-link text-dark px-3 mb-0" href="/"><i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a> */}
                
                </div>
            </div>
        </main>
    </div>
  );
};

export default IncidentDetails;