import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { useCookies } from "react-cookie";

function InstallerAvailibilityDetails() {

    const [cookies] = useCookies();

    const data = useLocation()
    
    const navigate = useNavigate()

    const [displayForm, setDisplayForm] = useState(false)

    const [loading, setLoading] = useState(false)
  
    const [value, setValue] = useState({
        availableDays: "",
    })

    // const { code, manufacturer, mylist, technology, performancewarranty, productwarranty, title } = value
    const {availableDays} = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    
    const updateProfile = async () => {
        try {
            setLoading(true)
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            let formdata = new FormData();
            formdata.append("available_days", availableDays);
            formdata.append("username", data.state.ele.installer.admin.user.username);

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://65.0.45.255:8000/add-availibility/${data.state.ele.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setTimeout(() => {
                        setLoading(false)
                        console.log(result)
                    }, 1000);
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className='admin__order__container' style={{ justifyContent: 'flex-start' }}>

            <div className='flex justify-between items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid white' }}>
                <div>
                    <Button title="Go Back" background="white" alignSelf="flex-start" onclick={() => navigate(-1)} />
                </div>
                <div className='flex justify-end gap-10'>
                    <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                    <Button title="Delete" color="white" background="red" />
                </div>
            </div>

            <div className='admin__card'>
                <div className='admin__order__details'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading="Availibility Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                    {data.state.ele.is_anvailable === true ? <Line title="Available" value={'Yes'} />
                                            :
                                            <Line title="Available" value={'No'} />
                                            }
                        <Line title="Available Dates" value={'data.state.ele.user.last_name'}/>
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                    <Line title="Start Time" value={data.state.ele.available_start_time}/>
                        <Line title="End Time" value={data.state.ele.available_end_time} />
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                    {data.state.ele.cancelled === true ? <Line title="Cancel" value={'Yes'} />
                                            :
                                            <Line title="Cancel" value={'No'} />
                                            }
                        <Line title="Reason" value={data.state.ele.reason}/>
                    </div>
                </div>
            </div>
            {displayForm &&
                <FormsContainer flexDirection="column">
                <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                    <Heading heading="Update your Availibility..." size="200%" />
                </div>
                <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <FormInput placeholder="Open Calendar" value={availableDays} name="availableDays" onChange={handleChange} />
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                        <Button title="Submit" background="orange" color="white" onclick={updateProfile} />
                        <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
                        
                    </div>
                </form>
            </FormsContainer>
}
        </div>
    )
}

export default InstallerAvailibilityDetails