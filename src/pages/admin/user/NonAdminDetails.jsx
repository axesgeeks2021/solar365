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

import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";


function NonAdminDetails() {

    const [cookies] = useCookies();

    const data = useLocation()

    const navigate = useNavigate()

    const [orderList, setOrderList] = useState([])

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
        alternatenumber: "",
        companyname: "",
    })

    // const { code, manufacturer, mylist, technology, performancewarranty, productwarranty, title } = value
    const {firstname, lastname, phone, email, addressline, city, state, street, postcode, country, profilepic, companyname, alternatenumber } = value

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
            formdata.append("company_name", companyname);
            formdata.append("alternate_phone", alternatenumber);

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
    const fetchData = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`http://65.0.45.255:8000/company-order/${data.state.ele.admin.user.id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setOrderList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const subscribe = fetchData()
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
                        <Heading heading="Company Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        
                        <Line title="Company Name" value={data.state.ele.company_name} />
                        <Line title="Username" value={data.state.ele.admin.user.username} />
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="First Name" value={data.state.ele.admin.user.first_name} />
                        <Line title="Last Name" value={data.state.ele.admin.user.last_name}/>
                        <Line title="Email" value={data.state.ele.admin.user.email}/>
                        
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        
                        <Line title="phone" value={data.state.ele.admin.user.phone} />
                        <Line title="alternate_phone" value={data.state.ele.alternate_phone} />
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
                
                <div style={{ width: '100%', padding: '20px 10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading='Order List' size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Project</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Name</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Email</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Mobile</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Full Address</div>
                                {/* <div className="col col-2 text-center text-slate-50 text-base font-bold">Apporved Status</div> */}
                            </li>
                            {
                                orderList?.map((ele, idx) => {
                                    return (
                                    <Link to="/admin-orders" state={{ele}} key={idx}>
                                        <li className="table-row">
                                            <div className={`col col-2 text-center`}>{ele.project}</div>
                                            <div className={`col col-2 text-center`}>{ele.to_address.user.first_name} {ele.to_address.user.last_name}</div>
                                            <div className={`col col-2 text-center`}>{ele.to_address.user.email}</div>
                                            <div className={`col col-2 text-center`}>{ele.to_address.user.phone} </div>
                                            <div className={`col col-2 text-center`}>{ele.to_address.address_line}, {ele.to_address.street},{ele.to_address.city}, {ele.to_address.state}, {ele.to_address.postcode}, {ele.to_address.country}</div>
                                        </li>
                                    </Link>
                                    )
                                })
                            }
                        </ul>
                        </div>
                </div>
            </div>
            {displayForm &&
                <FormsContainer flexDirection="column">
                <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                    <Heading heading="Update your Company profile..." size="200%" />
                </div>
                <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <FormInput placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                        <FormInput placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />
                        <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <FormInput placeholder="Alternate Number" value={alternatenumber} name="alternatenumber" onChange={handleChange} />
                        <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                    </div>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                        <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
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
                        <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
                    </div>
                </form>
            </FormsContainer>
}
        </div>
    )
}

export default NonAdminDetails