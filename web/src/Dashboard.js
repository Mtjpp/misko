import { incidentsCollection, storage } from './firebase';
// import { getDownloadURL, ref } from 'firebase/storage';
import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';


const Dashboard = () => {
    const [incidents, setIncidents] = useState([]);

    const getIncidents = async () => {    
        try{
            const querySnapshot = await getDocs(incidentsCollection)
            const incidentsMap = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const data = doc.data()
                    const date = new Date(data.date);
                    // Generating the downloadURL for each image so the url used is safe
                    // const downloadURL = ref(storage, data.imageUrl);
                    // console.log(data.imageUrl)
                    // Right output for date 
                    // const incidentDate = data.date.toDate()
                    // console.log(data.date)
                    // console.log(incidentDate.toLocaleString())
                    const formattedDate = date.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        timeZone: 'UTC', // Assuming the date is in UTC
                      });


                    return {
                        id: doc.id,
                        // date: incidentDate.toLocaleString(),
                        date: formattedDate,
                        image: data.imageUrl,
                        data: data,
                    }
                })
            )
            // console.log(incidentsMap)
            // querySnapshot.forEach((doc) => {
            //     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            //     // console.log(`${doc.id} => ${doc.data()}`)
            // })
            setIncidents(incidentsMap);
            setFilteredIncidents(incidentsMap);
            setSelectedIncidents(incidentsMap);
        }catch(error){
            console.error("Error getting documents: ", error);
        }
    }

    const [searchIncident, setSearchIncident] = useState('')
    const [filteredIncidents, setFilteredIncidents] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectTerm, setSelectTerm] = useState('');

    const [selectedOption, setSelectedOption] = useState('');
    //result
    const [selectedIncidents, setSelectedIncidents] = useState([])

    useEffect(() => {
        getIncidents();

        return setIncidents([]);
      }, []);

    
    useEffect(() => {
        setSearchIncident(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        setSelectedOption(selectTerm);
    }, [selectTerm]);

    useEffect(() => {
        const finalList = () => {

            const filteredIncidents = incidents.filter((incident) => incident.data.description.includes(searchIncident));
            if (selectedOption === 'none') {
                return filteredIncidents;
            } 
            else {
                const selectedIncidents = filteredIncidents.filter((incident) => incident.data.state.includes(selectedOption));
                return selectedIncidents;
            }
        };
        
        const updatedResults = finalList();

        setSelectedIncidents(updatedResults);
    }, [searchIncident, selectedOption, incidents]);
    



    const handleInputChange = (e) => { 
        setSearchTerm(e.target.value);

    }


    const handleSelectedChange = (event) => {
        setSelectTerm(event.target.value);
        
    }
    
    return(
        <div className="content">
            <div className="min-height-300 bg-primary position-absolute w-100">
                <div className="d-flex justify-content-center min-height-100">
                    <h1 
                        className="mt-3 col-md-7"
                        style={{color: "white",
                                fontSize: "4rem"}}>Dashboard</h1>
                </div>
            </div>
            <main className='main-content position-relative border-radius-lg ps'>
                <div className="row d-flex justify-content-center mt-10">
                    <div 
                        className="col-md-7 mt-5"
                        style={{position: "relative"}}>
                        <div 
                            className="pb-0 border-radius-lg col-md-7"
                            style={{height: "2.5rem",
                                    backgroundColor: "white",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: '5px'}}>
                            <img 
                                className="" alt="Tag" src="/assets/icon.svg"
                                style={{height: '1.25rem',
                                        width: '1.25rem',
                                        fill: 'grey'}}/>
                            <div className='w-90'>      
                                <input
                                    type="text"
                                    value={searchIncident}
                                    onChange={handleInputChange}
                                    placeholder='Type to search'
                                    style={{border: "none",
                                            outline: "none",
                                            width: "100%"}}
                                />
                            </div>
                            <div style={{position: "absolute",
                                         right: 25,
                                         display: 'flex'}}>
                                <div
                                    className='bg-primary'
                                    style={{height: "27px",
                                            width: "1px",
                                            marginRight: 10}} 
                                ></div>
                                <select
                                    style={{border: "none",
                                            outline: "none",
                                            width: "90%",
                                            height: "1.5rem",
                                            flex: 1}}
                                    value = {selectedOption} onChange={handleSelectedChange}>
                                    <option value= "none">none</option>
                                    <option value= "in progress">in progress</option>
                                    <option value= "evaluated">evaluated</option>
                                    <option value= "finished">finished</option>
                                </select>
                            </div>
                        </div>   
                        
                    </div>
                    <div className="col-md-7 mt-5">
                    <div className="card">
                        <div className="card-header pb-0 px-3">
                        </div>
                        <div className="card-body pt-0 p-3">
                        <ul className="list-group">
                            {selectedIncidents.map(incident => (
                                <a href={`/incident/${incident.id}`}>
                                <li key={incident.id} className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                <div className="row">
                                    <h6 className="mb-2 text-sm">{incident.data.description}</h6>
                                    {/* <div> */}
                                        <span className="mb-1 text-xs">Category: <span className="text-dark ms-sm-2 font-weight-bold">{incident.data.category}</span></span>
                                        {/* <span className="mb-1 text-xs">Added By: <span className="text-dark font-weight-bold ms-sm-2">{incident.data.userID}</span></span> */}
                                        {/* <span className="mb-1 text-xs">Added At: <span className="text-dark ms-sm-2 font-weight-bold">{incident.date}</span></span> */}
                                        <span className="text-xs">Status: <span className="text-dark ms-sm-2 font-weight-bold">{incident.data.state}</span></span>
                                    {/* </div> */}
                                </div>
                                <div className="ms-auto text-end">
                                    <div className='avatar'>
                                        <img src={incident.image} alt={incident.data.description} />
                                        {/* <p>{incident.data.description}</p> */}
                                    </div>
                                    {/* <a className="btn btn-link text-danger text-gradient px-3 mb-0" href="/"><i className="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a> */}
                                    {/* <a className="btn btn-link text-dark px-3 mb-0" href="/"><i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a> */}
                                </div>
                                </li>
                                </a>
                            ))}
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard