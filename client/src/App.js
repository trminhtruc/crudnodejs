import React, { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [cusName, setName] = useState("");
  const [cusAddress, setAddress] = useState("");
  const [cusNameList, setCusList] = useState([]);
  const [cusUpdate, setUpdate] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:3001/api/get").then((response)=>{
      setCusList(response.data);
    });
  }, []);

  const submitCustomer = () =>{
    axios.post("http://localhost:3001/api/insert", {
      cusName: cusName,
      cusAddress: cusAddress,
    });
    var newCus = {
      //"id":(Math.ceil(Math.random()*1000)),
      "ten":cusName,
      "address": cusAddress,
    }
    console.log(newCus);
    var newList = [...cusNameList];
    newList.push(newCus);
    setCusList(newList);


    // setCusList([
    //   ...cusNameList, 
    //   {cusName: cusName, cusAddress: cusAddress},
    // ]);
  };

  const deleteCus = (id) => {
    axios.delete(`http://localhost:3001/api/delete/${id}`);
    var newList = [...cusNameList];
     var indexOf = cusNameList.findIndex(x=>x.id ===id);
     console.log(indexOf);
     newList.splice(indexOf,1)
     setCusList(newList);
    // {
      // console.log(res.data);
    //  //setCusList(res.data)
   
    // });
    // console.log(id);
  };

  const updateAddress = (cusName) => {
    axios.put("http://localhost:3001/api/update", {
      cusName: cusName,
      cusAddress: cusUpdate,
    });

    setCusList([...cusNameList, 
    {cusName: cusName, cusAddress: cusUpdate}
  ]);
  };

    return (
      <div className="App">
        <h1>CURD DEMO</h1>
        <div className="form">
          <label>Customers Name</label>
          <input type="text" name="cusName" onChange={(e)=>{
            setName(e.target.value);
          }}/>
  
          <label>Customer Address</label>
          <input type="text" name="cusAddress" onChange={(e)=>{
            setAddress(e.target.value);
          }}/>
  
          <button onClick={submitCustomer}>Submit</button>
  
          {cusNameList.map((val) => {
            return(
              <div className="card">
                <h1>Customer Name: {val.ten}</h1>
                <p>Address: {val.address}</p>

                <button onClick={() => {deleteCus(val.id)}}>Delete</button>
                
                <input type="text" id="updateInput" onChange={(e) =>{
                  setUpdate(e.target.value);
                }}/>
                <button onClick={() => {updateAddress(val.ten)}}>Update</button> 
              </div>
            )
          })}
        </div>
      </div>
    );
}

export default App;
