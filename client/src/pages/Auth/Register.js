import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
 const navigate = useNavigate();


// form function
const handleSubmit=(e)=>{
  e.preventDefault();
  try{
    
  }
  catch(error){};
  console.log(name, email, password, address, phone);
}

  return (
    <Layout>
      <div className='register'>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName1" placeholder="Enter Your Name" />
          </div>
          <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEMail1" placeholder="Enter Your Email" />
          </div>
          <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
          </div>
          <div className="mb-3">
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone1" placeholder="Enter Your Phone Number" />
          </div>
          <div className="mb-3">
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress1" placeholder="Enter Your Address" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>
    </Layout>
  )
}

export default Register