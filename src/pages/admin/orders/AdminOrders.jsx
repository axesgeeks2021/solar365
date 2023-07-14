import React, { useState, useEffect } from 'react'
import Select from 'react-select';

import { useLocation, useNavigate } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'

import { useCookies } from "react-cookie";
import Accordian from '../../../components/Accordian'

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"


function AdminOrders() {

  const [cookies] = useCookies();

  const data = useLocation()

  const navigate = useNavigate()

  const [showState, setShowState] = useState(false)
  const [showState1, setShowState1] = useState(false)
  const [showState2, setShowState2] = useState(false)
  const [showState3, setShowState3] = useState(false)
  const [showState4, setShowState4] = useState(false)
  const [showState5, setShowState5] = useState(false)
  const [showState6, setShowState6] = useState(false)
  const [showState7, setShowState7] = useState(false)
  const [showState8, setShowState8] = useState(false)
  const [showState9, setShowState9] = useState(false)
  const [showState10, setShowState10] = useState(false)
  const [showState11, setShowState11] = useState(false)
  const [showState12, setShowState12] = useState(false)
  const [showState13, setShowState13] = useState(false)

  const [displayForm, setDisplayForm] = useState(false)

  const [loading, setLoading] = useState(false)

  const [orderDetails, setOrderDetails] = useState([])

  const [panelsList, setPanelsList] = useState([])

  const [invertersList, setInvertersList] = useState([])

  const [batteriesList, setBatteriesList] = useState([])

  const [otheConponentsList, setOtherComponentsList] = useState([])

  const [file, setFile] = useState()

  const handleFile = e => {
    setFile(e.target.files[0])
  }
  const [value, setValue] = useState({
    quotation: "",
    quantity: "",
    invoiceTitle: "",
    rate: "",
    dueDate: "",
    fullpayduedate: "",
    pay: "",
    installationType: "",
    isSend: "",
    description: "",
    otherComponent: "",
    systemSize: "",
    panelsQuantity: "",
    panels: "",
    batteries: "",
    inverterQuantity: "",
    inverter: "",
    monitoringQuantity: "",
    monitoring: "",
    meterPhase: "",

  })

  const {systemSize, panelsQuantity, panels, batteries,inverter, inverterQuantity, monitoring, monitoringQuantity, meterPhase, invoiceTitle, dueDate, fullpayduedate, pay, quantity, quotation, rate,description, installationType, isSend, otherComponent } = value
  // const { invoiceTitle, dueDate, fullpayduedate, pay, quantity, quotation, rate } = value
  const handleChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const updateOrder = async (e) => {
    e.preventDefault()
    alert("Hii Afrim")
    e.preventDefault()
    try {
      setLoading(true)
      let myHeaders = new Headers();
      myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

      let formdata = new FormData();
      // formdata.append("quotation", quotation);
      // formdata.append("quantity", quantity);
      // formdata.append("invoice_title", invoiceTitle);
      // formdata.append("rate", rate);
      // formdata.append("due_date", dueDate);
      // formdata.append("full_pay_due_date", fullpayduedate);
      // formdata.append("pay", pay);


      // fjghklsfdjgsfgjkls
      formdata.append("quotation", quotation);
      formdata.append("installation_Type", installationType);
      formdata.append("is_send", isSend);
      formdata.append("description", description);
      // formdata.append("other_component", otherComponent);
      // formdata.append("document_file", fileInput.files[0], documentFile);
      formdata.append("quantity", quantity);
      formdata.append("rate", rate);
      formdata.append("due_date", dueDate);
      formdata.append("full_pay_due_date", fullpayduedate);
      formdata.append("pay", pay);
      formdata.append("invoice_title", invoiceTitle);
      formdata.append("meter_Phase", meterPhase);
      formdata.append("inverter_quantity", inverterQuantity);
      formdata.append("monitoring_quantity", monitoringQuantity);
      formdata.append("monitoring", monitoring);
      formdata.append("panels_quantity", panelsQuantity);
      formdata.append("batteries", batteries);
      formdata.append("panels", panels);
      formdata.append("inverter", inverter);
      formdata.append("system_Size", systemSize);


      let requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`http://65.0.45.255:8000/order/${data.state.ele.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setTimeout(() => {
            setLoading(false)
            console.log(result)
            setOrderDetails(result)
          }, 1000);
        })
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
  const fetchOrderDetails = () => {
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

      fetch(`http://65.0.45.255:8000/order/${data.state.ele.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // setLoading(false)
          console.log(result)
          setOrderDetails(result)
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscribe = fetchOrderDetails()

    return () => subscribe
  }, [])

  if (loading) {
    return <Loading />
  }
  useEffect(() => {
    const subscribe = fetchBatteriesList()

    return () => subscribe
  }, [])

  if (loading) {
    return <Loading />
  }
  useEffect(() => {
    const subscribe = fetchPanelsList()

    return () => subscribe
  }, [])

  if (loading) {
    return <Loading />
  }
  useEffect(() => {
    const subscribe = fetchOtherComponentList()

    return () => subscribe
  }, [])

  if (loading) {
    return <Loading />
  }
  useEffect(() => {
    const subscribe = fetchInvertersList()

    return () => subscribe
  }, [])

  if (loading) {
    return <Loading />
  }


  return (
    <div className='admin__order__container'>
      <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid lightgray' }}>
        <div style={{ width: '50%' }}>
          <Button title="Go Back" color="white" background="lightgray" onclick={() => navigate(-1)} alignSelf="flex-start" />
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 10px' }}>
          <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
          <Button title="Delete" color="white" background="red" />
        </div>
      </div>
      <div className='admin__card'>
        {/* <div className='admin__order__image'>
          <img src={airplane} alt={airplane} className='img-fluid' />
        </div> */}
        <div className='admin__order__details'>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Heading heading="Customer Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
          </div>
          <hr></hr> */}
          {/* Customer Details */}
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState(!showState)}>Customer Details
                {
                  !showState ? <AiOutlinePlus size={40} onClick={() => setShowState(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Project" value={orderDetails?.order_details?.project} />
                <Line title="Customer Email" value={orderDetails?.order_details?.customer_name} />
                <Line title="Installation Type" value={orderDetails?.order_details?.installation_type} />
                <Line title="Building Type" value={orderDetails?.order_details?.building_Type} />
                <Line title="Quotation" value={orderDetails?.order_details?.quotation} />
                <Line title="Nmi Number" value={orderDetails?.order_details?.nmi_no} />
                <Line title="Meter Phase" value={orderDetails?.order_details?.meter_Phase} />
                <Line title="Status" value={orderDetails?.order_details?.order_status} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Kilowatt" value={data.state.ele.system_Size} />
            <Line title="Building Type" value={data.state.ele.building_Type} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Quotation" value={data.state.ele.quotation} />
            <Line title="Nmi Number" value={data.state.ele.nmi_no} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Meter Phase" value={data.state.ele.meter_Phase} />
            <Line title="Status" value={data.state.ele.order_status} />
          </div> */}
          {/* Panels Details */}
          <hr></hr>
          {orderDetails?.order_details?.panels !== null ? 
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState1(!showState1)}>Panels Details
                {
                  !showState1 ? <AiOutlinePlus size={40} onClick={() => setShowState1(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState1(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState1 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Title" value={orderDetails?.order_details?.panels?.title} />
                <Line title="Code" value={orderDetails?.order_details?.panels?.code} />
                <Line title="Manufacturer" value={orderDetails?.order_details?.panels?.manufacturer} />
                <Line title="Performance Warranty" value={orderDetails?.order_details?.panels?.performance_warranty} />
                <Line title="Product Warranty" value={orderDetails?.order_details?.panels?.product_warranty} />
                <Line title="Technology" value={orderDetails?.order_details?.panels?.technology} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
            :
            null}
          <hr></hr>
          {orderDetails?.order_details?.batteries !== null ? 
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState4(!showState4)}>Batteries Details
                {
                  !showState4 ? <AiOutlinePlus size={40} onClick={() => setShowState4(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState4(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState4 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Title" value={orderDetails?.order_details?.batteries?.title} />
                <Line title="Code" value={orderDetails?.order_details?.batteries?.code} />
                <Line title="Manufacturer" value={orderDetails?.order_details?.batteries?.manufacturer} />
                <Line title="Total Energy" value={orderDetails?.order_details?.batteries?.total_energy} />
                <Line title="Product Warranty" value={orderDetails?.order_details?.batteries?.product_warranty} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          :
          null
}
          {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Heading heading="Panel Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Panels" value={data.state.ele.panels.title} />
            <Line title="Code" value={data.state.ele.panels.code} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Technology" value={data.state.ele.panels.technology} />
            <Line title="Performance Warranty" value={data.state.ele.panels.performance_warranty} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Product Warranty" value={data.state.ele.panels.product_warranty} />
            <Line title="Manufacturer" value={data.state.ele.panels.manufacturer} />
          </div> */}
          {/* Panels Details */}
          <hr></hr>
          {orderDetails?.order_details?.inverter !== null ? 
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState2(!showState2)}>Inverter Details
                {
                  !showState2 ? <AiOutlinePlus size={40} onClick={() => setShowState2(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState2(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState2 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Title" value={orderDetails?.order_details?.inverter?.title} />
                <Line title="Code" value={orderDetails?.order_details?.inverter?.code} />
                <Line title="Manufacturer" value={orderDetails?.order_details?.inverter?.manufacturer} />
                <Line title="Inverter Type" value={orderDetails?.order_details?.inverter?.inverter_type} />
                <Line title="Product Warranty" value={orderDetails?.order_details?.inverter?.product_warranty} />
                <Line title="Rated Output Power" value={orderDetails?.order_details?.inverter?.rated_ouptut_power} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          :
          null}
          <hr></hr>

          {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Heading heading="Inverter Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Inverter" value={data.state.ele.inverter.title} />
            <Line title="Code" value={data.state.ele.inverter.code} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Product Warranty" value={data.state.ele.inverter.product_warranty} />
            <Line title="Inverter Type" value={data.state.ele.inverter.inverter_type} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Rated Output Power" value={data.state.ele.inverter.rated_output_power} />
            <Line title="Manufacturer" value={data.state.ele.inverter.manufacturer} />
          </div> */}
          {/* Other Component */}
          {orderDetails?.order_details?.other_component?.length !== 0 ? 
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState3(!showState3)}>Other Component Details
                {
                  !showState3 ? <AiOutlinePlus size={40} onClick={() => setShowState3(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState3(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState3 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                {
                  orderDetails?.order_details?.other_component?.map((ele, idx) => {
                    return (
                      <div key={idx} style={{borderRight: '1px solid black'}}>
                        <Line title="Title" value={ele.title} />
                        <Line title="Code" value={ele.code} />
                        <Line title="Manufacturer" value={ele.manufacturer} />
                        <Line title="Optimisor" value={ele.optimisor} />
                        <Line title="Optimisor Heading" value={ele.optimisor_heading} />
                        <Line title="Product Warranty" value={ele.product_warranty} />
                        <Line title="Smart Meter" value={ele.smart_meter} />
                        <Line title="Smart Meter Heading" value={ele.smart_meter_heading} />
                      </div>
                    ) 
                  })
                }
                {/* <Line title="Title" value={orderDetails?.inverter?.title} />
                <Line title="Code" value={orderDetails?.inverter?.code} />
                <Line title="Manufacturer" value={orderDetails?.inverter?.manufacturer} />
                <Line title="Inverter Type" value={orderDetails?.inverter?.inverter_type} />
                <Line title="Product Warranty" value={orderDetails?.inverter?.product_warranty} />
                <Line title="Rated Output Power" value={orderDetails?.inverter?.rated_ouptut_power} /> */}
              </div>
            </div>
            
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          :
          null
          }
          {/* Afrin */}
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState10(!showState10)}>Invoice Details
                {
                  !showState10 ? <AiOutlinePlus size={40} onClick={() => setShowState10(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState10(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState10 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                {/* <Line title="Title" value={orderDetails?.order_details?.panels?.title} />
                <Line title="Code" value={orderDetails?.order_details?.panels?.code} />
                <Line title="Manufacturer" value={orderDetails?.order_details?.panels?.manufacturer} />
                <Line title="Performance Warranty" value={orderDetails?.order_details?.panels?.performance_warranty} />
                <Line title="Product Warranty" value={orderDetails?.order_details?.panels?.product_warranty} />
                <Line title="Technology" value={orderDetails?.order_details?.panels?.technology} /> */}

                <Line title="Invoice Number" value={orderDetails?.invoice?.invoice_number} />
                <Line title="Title" value={orderDetails?.invoice?.invoice_title} />
                <Line title="Name" value={orderDetails?.invoice?.name} />
                <Line title="Email" value={orderDetails?.invoice?.email} />
                <Line title="Quantity" value={orderDetails?.invoice?.quantity} />
                <Line title="Rate" value={orderDetails?.invoice?.rate} />
                <Line title="Special Discount" value={orderDetails?.invoice?.special_discount} />
                <Line title="Other " value={orderDetails?.invoice?.other} />
                <Line title="Total Amount" value={orderDetails?.invoice?.total_amount} />
                <Line title="Amount Due" value={orderDetails?.invoice?.amount_due} />
                <Line title="Amount Paid" value={orderDetails?.invoice?.amount_paid} />
                <Line title="Due Date" value={orderDetails?.invoice?.due_date} />
                <Line title="Full Payment Due Date" value={orderDetails?.invoice?.full_pay_due_date} />
                <Line title="Receipt" value={orderDetails?.invoice?.invoice} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} /> 
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          {orderDetails?.invoice_history?.length !== 0 ? 
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState13(!showState13)}> Invoice History
                {
                  !showState13 ? <AiOutlinePlus size={40} onClick={() => setShowState13(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState13(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState13 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                {
                  orderDetails?.invoice_history?.map((ele, idx) => {
                    return (
                      <div key={idx} style={{borderRight: '1px solid black'}}>
                        <Line title="Invoice Number" value={ele.invoice_number} />
                        {/* <Line title="Title" value={ele.invoice_title} />
                        <Line title="Name" value={ele.name} />
                        <Line title="Email" value={ele.email} />
                        <Line title="Quantity" value={ele.quantity} />
                        <Line title="Rate" value={ele.rate} /> */}
                        <Line title="Total_amount" value={ele.total_amount} />
                        <Line title="Amount Due" value={ele.amount_due} />
                        <Line title="Amount Paid" value={ele.amount_paid} />  
                        <Line title="Receipt" value={ele.receipt} />
                        {/* <Line title="Due Date" value={ele.due_date} />
                        <Line title="Payment Date" value={ele.payment_date} /> */}
                      </div>
                    ) 
                  })
                }
              </div>
            </div>
          </div>
            :
            null}
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState5(!showState5)}>Customer Document
              <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                {
                  !showState5 ? <AiOutlinePlus size={40} onClick={() => setShowState5(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState5(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState5 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Contract File" value={orderDetails?.documents?.contract_file} />
                {/* <Line title="Contract Status" value={orderDetails?.documents?.contract_status} /> */}
                <Line title="Meter Box" value={orderDetails?.documents?.meter_box} />
                {/* <Line title="Meter Status" value={orderDetails?.documents?.meter_status} /> */}
                <Line title="Electricity Bill" value={orderDetails?.documents?.electricity_bill} />
                {/* <Line title="Electricity Status" value={orderDetails?.documents?.electricity_status} /> */}
                <Line title="Council Rate" value={orderDetails?.documents?.council_rate} />
                {/* <Line title="Council Status" value={orderDetails?.documents?.council_status} /> */}
                <Line title="Miscellaneous File" value={orderDetails?.documents?.miscellaneous_file} />
                {/* <Line title="Miscellaneous Status" value={orderDetails?.documents?.miscellaneous_status} /> */}
                <Line title="Document Status" value={orderDetails?.documents?.doc_status} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState6(!showState6)}>Pre-Site Risk Assessment
              <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                {
                  !showState6 ? <AiOutlinePlus size={40} onClick={() => setShowState6(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState6(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState6 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="What is the approximate age of the property? " value={orderDetails?.presite?.approximate_age} />
                <Line title="Is there any obvious hazards while approaching or entering your property? " value={orderDetails?.presite?.hazards} />
                {orderDetails?.presite?.hazards === "Yes" ?
                <Line title="select_hazards" value={orderDetails?.presite?.select_hazards} />
                :null}
                {orderDetails?.presite?.hazards === "Yes" ?
                <Line title="document_attachment" value={orderDetails?.presite?.document_attachment} />
                :null}
                <Line title="Is there any part of the roof structure is fragile/brittle or has skylights? " value={orderDetails?.presite?.roof_structure} />
                
                <Line title="Does moss/algae/dew build up on the roof which may make it slippery? " value={orderDetails?.presite?.moss} />
                {/* <Line title="moss_comment" value={orderDetails?.presite?.moss_comment} /> */}
                <Line title="Is there any high-tension overhead electrical lines passing-by within 4m of roof/property? " value={orderDetails?.presite?.high_tension} />
                {/* <Line title="Has the roof been damaged severley in the past and been repaired since then?" value={orderDetails?.presite?.damaged_severley} /> */}
                <Line title="Has the roof been damaged severley in the past and been repaired since then?" value={orderDetails?.presite?.roof_damage} />
                <Line title="Is there any damaged or exposed electrical cable which can be concern of installer?" value={orderDetails?.presite?.any_damage} />

                <Line title="Is there high pedestrian/vehicle activities, education institute, childcare, Aged Care, Construction Site, etc around your premise?" value={orderDetails?.presite?.vehicle_activities} />
                <Line title="Do you know if any asbestos present inside the electricity meter box or roof?" value={orderDetails?.presite?.asbestos_presence} />
                <Line title="Any other Safety concerns which you would like to mention about and we haven't asked you?" value={orderDetails?.presite?.safety_concerns} />
                {orderDetails?.presite?.safety_concerns === "Yes" ?
                <Line title="Comment" value={orderDetails?.presite?.safety_concerns_comment} />
                :null}
                {orderDetails?.presite?.safety_concerns === "Yes" ?
                <Line title="high_tension_attachment" value={orderDetails?.presite?.high_tension_attachment} />
                :null}
                
                <Line title="Presite Status" value={orderDetails?.presite?.presite_status} /> 
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>

          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState12(!showState12)}>Grid Approval 
              <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                {
                  !showState12 ? <AiOutlinePlus size={40} onClick={() => setShowState12(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState12(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState12 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Nmi Number" value={orderDetails?.grid_approval?.nmi_no} />
                <Line title="Meter Date" value={orderDetails?.grid_approval?.meter_date} />
                <Line title="Meter Approval" value={orderDetails?.grid_approval?.meter_Approved_date} />
                <Line title="Energy Provider" value={orderDetails?.grid_approval?.energy_provider} />
                <Line title="Grid Status" value={orderDetails?.grid_approval?.grid_status} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState8(!showState8)}>Installation Details
              <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                {
                  !showState8 ? <AiOutlinePlus size={40} onClick={() => setShowState8(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState8(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState8 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Installation Booking" value={orderDetails?.installation?.ins_booking_date} />
                <Line title="Installation Completed" value={orderDetails?.installation?.ins_completed_date} />
                <Line title="Payment Due" value={orderDetails?.installation?.payment_due} />
                <Line title="Installation Status" value={orderDetails?.installation?.installation_status} />
                <Line title="Net Meter Status" value={orderDetails?.installation?.net_meter_status} />
                <Line title="Important Info" value={orderDetails?.installation?.important_info} />
                <Line title="Installation Status" value={orderDetails?.installation?.ins_status} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState7(!showState7)}>Installation Document
              <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                {
                  !showState7 ? <AiOutlinePlus size={40} onClick={() => setShowState7(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState7(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState7 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Contract" value={orderDetails?.installation_document?.contract_docs} />
                {/* <Line title="Contract Status" value={orderDetails?.installation_document?.contract_status} /> */}
                <Line title="Grid Approval" value={orderDetails?.installation_document?.grid_approval_docs} />
                {/* <Line title="Grid Approval Status" value={orderDetails?.installation_document?.grid_approval_status} /> */}
                <Line title="Compliance" value={orderDetails?.installation_document?.compliance_docs} />
                {/* <Line title="Compliance Status" value={orderDetails?.installation_document?.compliance_status} /> */}
                <Line title="User manual" value={orderDetails?.installation_document?.user_manual} />
                <Line title="Pv Site Info" value={orderDetails?.installation_document?.pv_site_info_docs} />
                {/* <Line title="Pv Site Info Status" value={orderDetails?.installation_document?.pv_site_info_status} /> */}
                <Line title="Energy Yield Report" value={orderDetails?.installation_document?.energy_yield_report_docs} />
                {/* <Line title="Energy Yield Report Status" value={orderDetails?.installation_document?.energy_yield_report_status} /> */}
                <Line title="Safety Certificate" value={orderDetails?.installation_document?.safety_certificate_docs} />
                {/* <Line title="Safety Certificate Status" value={orderDetails?.installation_document?.safety_certificate_status} /> */}
                <Line title="NOC" value={orderDetails?.installation_document?.noc_docs} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState9(!showState9)}>Warranty Document
              <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                {
                  !showState9 ? <AiOutlinePlus size={40} onClick={() => setShowState9(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState9(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState9 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Panels Brands" value={orderDetails?.warranty_document?.panels_brands} />
                <Line title="Panels" value={orderDetails?.warranty_document?.panels_docs} />
                <Line title="Inverter Brands" value={orderDetails?.warranty_document?.inverter_brands} />
                <Line title="Inverter" value={orderDetails?.warranty_document?.inverter_docs} />
                <Line title="Battery Brands" value={orderDetails?.warranty_document?.battery_brands} />
                <Line title="Battery" value={orderDetails?.warranty_document?.battery_docs} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          <hr></hr>
          {orderDetails?.booking_appointment !== undefined ? 
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState11(!showState11)}>Appointment Details
              <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                {
                  !showState11 ? <AiOutlinePlus size={40} onClick={() => setShowState11(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState11(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState11 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                {orderDetails?.booking_appointment?.appointment_appove === false ?
                  <Line title="Appointment Status" value="Not Approve"/>
                :
                <Line title="Appointment Status" value="Approved" />}
                <Line title="Appointment Date" value={orderDetails?.booking_appointment?.appointment_date} />
                <Line title="Appointment Time" value={orderDetails?.booking_appointment?.appointment_time} />
                {orderDetails?.booking_appointment?.approval_send === false ?
                  <Line title="Approval Send" value="Not Send"/>
                :
                <Line title="Approval Send" value="Sent" />}
                {orderDetails?.booking_appointment?.cancelled === false ?
                  <Line title="Cancel" value="Not Cancel"/>
                :
                <Line title="Cancel" value="Cancelled" />
                }
                {orderDetails?.booking_appointment?.cancelled === true ?
                <Line title="Reason" value={orderDetails?.booking_appointment?.reason} />
                :
                null}
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          :
          null}
        </div>
      </div>
      
      {
        displayForm && <FormsContainer flexDirection="column">
          <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
            <Heading heading="Update your order..." size="200%" />
          </div>
          <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={updateOrder}>
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
              
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Panels Quantity"  value={panelsQuantity} name="panelsQuantity" onChange={handleChange} />
              <FormInput placeholder="Inverter Quantity" value={inverterQuantity} name="inverterQuantity" onChange={handleChange} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Battery" value={batteries} name="batteries" onChange={handleChange} />
              <FormInput placeholder="Other Component" value={otherComponent} name="otherComponent" onChange={handleChange} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Monitoring" value={monitoring} name="monitoring" onChange={handleChange} />
              <FormInput placeholder="Monitoring Quantity" value={monitoringQuantity} name="monitoringQuantity" onChange={handleChange} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
            <FormInput placeholder="System Size" value={systemSize} name="systemSize" onChange={handleChange} />
              <FormInput placeholder="Document File" type="file" onChange={handleFile} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Quotation" value={quotation} name="quotation" onChange={handleChange} />
              <FormInput placeholder="Quantity" value={quantity} name="quantity" onChange={handleChange} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Installation Type" value={installationType} name="installationType" onChange={handleChange} />
              <FormInput placeholder="Meter Phase" value={meterPhase} name="meterPhase" onChange={handleChange} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Invoice Title" value={invoiceTitle} name="invoiceTitle" onChange={handleChange} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Rate" value={rate} name="rate" onChange={handleChange} />
              <FormInput placeholder="Due Date" type="date" value={dueDate} name="dueDate" onChange={handleChange} />
            </div>
            
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Full pay due date" type="date" value={fullpayduedate} name="fullpayduedate" onChange={handleChange} />
              <FormInput placeholder="Pay" value={pay} name="pay" onChange={handleChange} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <FormInput placeholder="Is Send" value={isSend} name="isSend" onChange={handleChange} />
              <FormInput placeholder="Description" value={description} name="description" onChange={handleChange} />
            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
              <Button title="Submit" background="orange" color="white" type="submit"/>
              <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
            </div>
          </form>
        </FormsContainer>
      }
    </div>
  )
}

export default AdminOrders