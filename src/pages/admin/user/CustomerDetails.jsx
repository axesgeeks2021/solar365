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
import { useEffect } from 'react';
import { useCookies } from "react-cookie";


function CustomerDetails() {

    const [cookies] = useCookies();

    const data = useLocation()

    const navigate = useNavigate()

    const [file, setFile] = useState()

    const [assignTo, setAssignToList] = useState([])

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
        alternatenumber: "",
        lookingfor:"",
        projectcapacity:"",
        utilitybill:"",
        assignto:"",
        supply:"",
        rooftype:"",
        floor:"",
        remarks:"",
        buyingoptions:"",
        followsup1:"",
        followsup2:"",
    })
    

    // const { code, manufacturer, mylist, technology, performancewarranty, productwarranty, title } = value
    const {firstname, lastname, phone, email, addressline, city, state, street, postcode, country, profilepic, alternatenumber, lookingfor, projectcapacity, utilitybill, assignto, supply, rooftype, floor, remarks, buyingoptions, followsup1, followsup2, } = value

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
            formdata.append("alternate_phone", alternatenumber)
            formdata.append("looking_for", lookingfor);
            formdata.append("project_capacity", projectcapacity);
            formdata.append("utility_bill", utilitybill);
            formdata.append("assign_to", assignto);
            formdata.append("supply", supply);
            formdata.append("roof_type", rooftype);
            formdata.append("floor", floor);
            formdata.append("remarks", remarks);
            formdata.append("buying_options", buyingoptions);
            formdata.append("follows_up_1", followsup1);
            formdata.append("follows_up_2", followsup2);


            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://65.0.45.255:8000/update_profile/${data.state.ele.admin.user.id}/`, requestOptions)
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
    const fetchAssignList = () => {
        // alert("ShwetA")
        try {
          // setLoading(true)
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
          myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");
    
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
    
          fetch(`http://65.0.45.255:8000/assign_to/`, requestOptions)
            .then(response => response.json())
            .then(result => {
              // setLoading(false)
              setAssignToList(result)
            })
            .catch(error => console.log('error', error));
    
        } catch (error) {
          console.log(error)
        }
      }
    useEffect(() => {
        const subscribe = fetchAssignList()

        return () => subscribe
    }, [])
    
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
                        <Heading heading="Customer Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="First Name" value={data.state.ele.admin.user.first_name} />
                        <Line title="Last Name" value={data.state.ele.admin.user.last_name}/>
                        <Line title="Email" value={data.state.ele.admin.user.email}/>
                        
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Username" value={data.state.ele.admin.user.username} />
                        <Line title="phone" value={data.state.ele.admin.user.phone} />
                        <Line title="Profile Pic" value={data.state.ele.admin.user.profile_pic}/>
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Address" value={data.state.ele.admin.address_line} />
                        <Line title="street" value={data.state.ele.admin.street} />
                        <Line title="City" value={data.state.ele.admin.city}/>
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="State" value={data.state.ele.admin.state} />
                        <Line title="Postcode" value={data.state.ele.admin.postcode} />
                        <Line title="Country" value={data.state.ele.admin.country}/>
                    </div>
                </div>
            </div>
            {displayForm &&
                <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <Heading heading=" your Customer profile..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                            <FormInput placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                            <FormInput placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />
                            <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                            
                   
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                            <FormInput placeholder="Address Line" value={addressline} name="addressline" onChange={handleChange} />
                            <FormInput placeholder="Street" value={street} name="street" onChange={handleChange} />
                            
                            
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="City" value={city} name="city" onChange={handleChange} />
                            <FormInput placeholder="State" value={state} name="state" onChange={handleChange} />
                        <FormInput placeholder="PostCode" value={postcode} name="postcode" onChange={handleChange} />
                        
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="Country" value={country} name="country" onChange={handleChange} />
                        <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                            <FormInput placeholder="Alternate Number" value={alternatenumber} name="alternatenumber" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            
                        <FormInput placeholder="Looking For" value={lookingfor} name="lookingfor" onChange={handleChange} />
                            <FormInput placeholder="Project Capacity" value={projectcapacity} name="projectcapacity" onChange={handleChange} />
                            <FormInput placeholder="Utility Bill" value={utilitybill} name="utilitybill" onChange={handleChange} />
                            
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        {/* <FormInput placeholder="Assign To" value={assignto} name="assignto" onChange={handleChange} /> */}
                        {/* Multiple Select */}
                        <select placeholder="Assign" value={assignto} name="assignto" onChange={handleChange}> 
                            <option > -- Assign To -- </option>
                            {assignTo.map((assignto) => <option value={assignto.id}>{assignto.email}</option>)}
                        </select>
                            <FormInput placeholder="Supply" value={supply} name="supply" onChange={handleChange} />
                            <FormInput placeholder="Roof Type" value={rooftype} name="rooftype" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            
                        <FormInput placeholder="Floor" value={floor} name="floor" onChange={handleChange} />
                            <FormInput placeholder="Remarks" value={remarks} name="remarks" onChange={handleChange} />
                            <FormInput placeholder="Buying Options" value={buyingoptions} name="buyingoptions" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Follows Up 1" value={followsup1} name="followsup1" onChange={handleChange} />
                            <FormInput placeholder="Follows Up 2" value={followsup2} name="followsup2" onChange={handleChange} />
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

export default CustomerDetails