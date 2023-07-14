import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../../../components/loading/Loading'
import OrderList from '../../../components/orders/OrderList'
import { Link } from 'react-router-dom'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import Button from '../../../components/Button/Button'

import { useCookies } from "react-cookie";

import FormsContainer from '../Forms/FormsContainer'
import Heading from '../../../components/heading/Heading'

import FormInput from '../../../components/inputsfield/FormInput'



function AdminDashboard() {

    const [cookies] = useCookies();

    const [loading, setLoading] = useState(false)

    const [orderLists, setOrderLists] = useState([])

    const [showForm, setShowForm] = useState(false)

    const [usersList, setUsersList] = useState([])
    const [userName, setUserName] = useState('')

    const [panelsList, setPanelsList] = useState([])

    const [invertersList, setInvertersList] = useState([])

    const [batteriesList, setBatteriesList] = useState([])

    const [otheConponentsList, setOtherComponentsList] = useState([])

    const [file, setFile] = useState()

    const handleFile = e => {
        setFile(e.target.files[0])
    }

    const handleSelectValue = e => {
        setUserName(e.target.value)
    }
    const [text, setText] = useState({
        username: "",
        systemSize: "",
        buildingType: "",
        nmiNo: "",
        panels: "",
        inverter: "",
        roofType: "",
        roofAngle: "",
        meterPhase: "",
        installationType: "",
        panelsQuantity: "",
        inverterQuantity: "",
        otherComponent: "",
        batteries: ""
    })

    const { batteries, buildingType, installationType, inverter, inverterQuantity, meterPhase, nmiNo, otherComponent, panels, panelsQuantity, roofAngle, roofType, systemSize, username } = text

    const handleChange = e => {
        setText({ ...text, [e.target.name]: e.target.value })
    }

    const fetchOrder = async () => {
        try {

            setLoading(true)
            const url = "http://65.0.45.255:8000/order/"

            const headers = new Headers()

            headers.append('Authorization', `Token ${cookies.Authorization}`)

            const res = await fetch(url, {
                headers: headers
            })

            const data = await res.json()

            setTimeout(() => {
                setLoading(false)
                // console.log(data)
                setOrderLists(data)
            }, 200);

        } catch (error) {
            console.log(error)
        }
    }

    const createOrder = (e) => {
        e.preventDefault() 
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

            const formdata = new FormData();
            formdata.append("username", userName);
            formdata.append("system_Size", systemSize);
            formdata.append("building_Type", buildingType);
            formdata.append("nmi_no", nmiNo);
            formdata.append("panels", panels);
            formdata.append("inverter", inverter);
            formdata.append("roof_Type", roofType); 
            formdata.append("roof_Angle", roofAngle);
            formdata.append("meter_Phase", meterPhase);
            formdata.append("installation_Type", installationType);
            formdata.append("document_file", file);
            formdata.append("panels_quantity", panelsQuantity);
            formdata.append("inverter_quantity", inverterQuantity);
            formdata.append("other_component", otherComponent);
            formdata.append("batteries", batteries);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://65.0.45.255:8000/order/", requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const getAllUserList = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://65.0.45.255:8000/username_list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    // setLoading(false)
                    setUsersList(result)
                  })
                // .then(result => console.log(result))
                // setUsersList(result)
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }


    const fetchPanelsList = () => {
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
    
          fetch(`http://65.0.45.255:8000/module/`, requestOptions)
            .then(response => response.json())
            .then(result => {
              // setLoading(false)
              setPanelsList(result)
            })
            .catch(error => console.log('error', error));
    
        } catch (error) {
          console.log(error)
        }
      }
    
    const fetchBatteriesList = () => {
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

        fetch(`http://65.0.45.255:8000/battery_module/`, requestOptions)
            .then(response => response.json())
            .then(result => {
            // setLoading(false)
            setBatteriesList(result)
            })
            .catch(error => console.log('error', error));

        } catch (error) {
        console.log(error)
        }
    }
    const fetchInvertersList = () => {
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

        fetch(`http://65.0.45.255:8000/inverter_module/`, requestOptions)
            .then(response => response.json())
            .then(result => {
            // setLoading(false)
            setInvertersList(result)
            })
            .catch(error => console.log('error', error));

        } catch (error) {
        console.log(error)
        }
    }
    const fetchOtherComponentList = () => {
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

        fetch(`http://65.0.45.255:8000/other_component/`, requestOptions)
            .then(response => response.json())
            .then(result => {
            // setLoading(false)
            setOtherComponentsList(result)
            })
            .catch(error => console.log('error', error));

        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchOrder()
        const userSubscribe = getAllUserList()
        const panelSubscrib = fetchPanelsList()
        const inverterSubscrib = fetchInvertersList()
        const batteriesSubscrib = fetchBatteriesList()
        const otherComponentSubscrib = fetchOtherComponentList()

        return () => subscribe, userSubscribe, panelSubscrib, inverterSubscrib, batteriesSubscrib, otherComponentSubscrib

    }, [])


    if (loading) {
        return <Loading />
    }

    return (
        <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <AdminSideNavigation />
            </div>
            <div className="container py-5">
                <div className='py-2 flex justify-end'>
                    <Button title="Add New Order" background="green" color="white" onclick={() => setShowForm(!showForm)} />
                </div>
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Id</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Project</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Customer Name</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">System Size</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Building Type</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Nmi No.</div>
                        {/* <div className="col col-1 text-center">Panels</div>
                        <div className="col col-1 text-center">Inverter</div> */}
                        {/* <div className="col col-1 text-center">Meter Phase</div> */}
                        {/* <div className="col col-1 text-center">Order Status</div> */}
                        {/* <div className="col col-1 text-center">Manufacturer</div> */}
                        {/* <div className="col col-1 text-center">Smart Meter</div> */}
                    </li>
                    {
                        orderLists?.length < 1 ? <h2>There is no order available right now...</h2> : orderLists?.map((ele, idx) => {
                            return (
                                <Link to="/admin-orders" state={{ ele }} key={idx}>
                                    <OrderList
                                        Id={ele.id}
                                        Project={ele.project}
                                        CustomerName={ele.customer_name}
                                        SystemSize={ele.system_Size}
                                        BuildingType={ele.building_Type}
                                        NmiNo={ele.nmi_no}
                                    // Panels={ele.panels}
                                    // Inverter={ele.inverter}
                                    // MeterPhase={ele.meter_Phase}
                                    // OrderStatus={ele.order_status}
                                    // Manufacturer={ele.other_component.map((ele , idx) => {
                                    //     return ele.manufacturer
                                    // })}
                                    // SmartMeter={ele.other_component[0].smart_meter} 
                                    />
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            {
                showForm && <FormsContainer flexDirection="column" on>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading  heading="Add your order..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={createOrder}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            {/* <FormInput placeholder="Username" value={username} name="username" onChange={handleChange} /> */}
                                <select placeholder="Panel" name="username" onChange={handleSelectValue}> 
                                    <option > -- Select Customer -- </option>
                                    {usersList.data.map((username) => <option value={username}>{username}</option>)}
                                </select>   
                            <FormInput placeholder="System Size" value={systemSize} name="systemSize" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Building Type" value={buildingType} name="buildingType" onChange={handleChange} />
                            <FormInput placeholder="Nmi Number" value={nmiNo} name="nmiNo" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <select placeholder="Panel" value={panels.id} name="panels" onChange={handleChange}> 
                            <option > -- Select Panel -- </option>
                            {panelsList.map((panels) => <option value={panels.id}>{panels.title}</option>)}
                        </select>
                        <select placeholder="Inverter" value={inverter.id} name="inverter" onChange={handleChange}> 
                            <option > -- Select Inverter -- </option>
                            {invertersList.map((inverter) => <option value={inverter.id}>{inverter.title}</option>)}
                        </select>
                        <select placeholder="Batteries" value={batteries.id} name="batteries" onChange={handleChange}> 
                            <option > -- Select Battery -- </option>
                            {batteriesList.map((batteries) => <option value={batteries.id}>{batteries.title}</option>)}
                        </select>
                        <select placeholder="Other Component" value={otherComponent.id} name="otherComponent" onChange={handleChange}> 
                            <option > -- Select Other Component -- </option>
                            {otheConponentsList.map((otherComponent) => <option value={otherComponent.id}>{otherComponent.title}</option>)}
                        </select>
                            {/* <FormInput placeholder="Panels" value={panels} name="panels" onChange={handleChange} />
                            <FormInput placeholder="Inverter" value={inverter} name="inverter" onChange={handleChange} /> */}
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Roof Type" value={roofType} name="roofType" onChange={handleChange} />
                            <FormInput placeholder="Roof Angle" value={roofAngle} name="roofAngle" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Meter Phase" value={meterPhase} name="meterPhase" onChange={handleChange} />
                            <FormInput placeholder="Installation Type" value={installationType} name="installationType" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Panels Quantity" value={panelsQuantity} name="panelsQuantity" onChange={handleChange} />
                            <FormInput placeholder="Inverter Quantity" value={inverterQuantity} name="inverterQuantity" onChange={handleChange} />
                        </div>
                        {/* <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Other Component" value={otherComponent} name="otherComponent" onChange={handleChange} />
                            <FormInput placeholder="Battries" value={batteries} name="batteries" onChange={handleChange} />
                        </div> */}
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Document File" type="file" onChange={handleFile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" background="orange" color="white" type="submit"/>
                            <Button title="Close" background="gray" color="white" onclick={() => setShowForm(false)} />
                        </div>
                    </form>
                </FormsContainer>
            }
        </div>
    )
}

export default AdminDashboard