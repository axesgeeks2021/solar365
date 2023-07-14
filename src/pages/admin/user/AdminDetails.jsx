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


function AdminDetails() {

    const [cookies] = useCookies();

    const data = useLocation()

    const navigate = useNavigate()

    const [file, setFile] = useState()

    const handleFile = e => {
        setFile(e.target.files[0])
    }


    const [displayForm, setDisplayForm] = useState(false)

    const [loading, setLoading] = useState(false)
  
    const [value, setValue] = useState({
        addressline: "",
        city: "",
        country: "",
        state: "",
        street: "",
        postcode:"",
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        profilepic: "",
    })

    // const { code, manufacturer, mylist, technology, performancewarranty, productwarranty, title } = value
    const {firstname, lastname, phone, email, addressline, city, state, street, postcode, country, profilepic } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    
    const updateProfile = async () => {
        try {
            setLoading(true)
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            let formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            formdata.append("profile_pic", file);
            formdata.append("address_line", addressline);
            formdata.append("city", city);
            formdata.append("state", state);
            formdata.append("street", street);
            formdata.append("postcode", postcode);
            formdata.append("country", country);
            formdata.append("profile_pic", profilepic);

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://65.0.45.255:8000/update_profile/${data.state.ele.id}/`, requestOptions)
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
                        <Heading heading="Admin Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="First Name" value={data.state.ele.user.first_name} />
                        <Line title="Last Name" value={data.state.ele.user.last_name}/>
                        <Line title="Email" value={data.state.ele.user.email}/>
                        
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Username" value={data.state.ele.user.username} />
                        <Line title="phone" value={data.state.ele.user.phone} />
                        <Line title="Profile Pic" value={data.state.ele.user.profile_pic}/>
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Address" value={data.state.ele.address_line} />
                        <Line title="street" value={data.state.ele.street} />
                        <Line title="City" value={data.state.ele.city}/>
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="State" value={data.state.ele.state} />
                        <Line title="Postcode" value={data.state.ele.postcode} />
                        <Line title="Country" value={data.state.ele.country}/>
                    </div>
                </div>
            </div>
            {displayForm &&
                <FormsContainer flexDirection="column">
                <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                    <Heading heading="Update your Admin profile..." size="200%" />
                </div>
                <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <FormInput placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                        <FormInput placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />

                        <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                        <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="Address" value={addressline} name="addressline" onChange={handleChange} />
                        <FormInput placeholder="Street" value={street} name="street" onChange={handleChange} />
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="City" value={city} name="city" onChange={handleChange} />
                        <FormInput placeholder="State" value={state} name="state" onChange={handleChange} />
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="PostCode" value={postcode} name="postcode" onChange={handleChange} />
                        <FormInput placeholder="Country" value={country} name="country" onChange={handleChange} />
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                        <Button title="Submit" background="orange" color="white" onclick={updateProfile} />
                        {/* <Button title="Close" background="gray" color="white" onclick={() => setDisplay({ admin: false })} /> */}
                        <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
                        
                    </div>
                </form>
            </FormsContainer>
}
        </div>
    )
}

export default AdminDetails