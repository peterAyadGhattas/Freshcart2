
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';

import ClipLoader from "react-spinners/ClipLoader";

import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Contexts/AuthContext';
export default function Login() {
  
  const [errorMsg, seterrorMsg] = useState('');
const [successMsg, setsuccessMsg] = useState('');
const navigate =useNavigate()
 const [isLoading, setisLoading] = useState(false)
 let {setUserToken}= useContext(AuthContext)
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter valid email'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Minimum eight characters, at least one letter, one number and one special character'),
  });

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  async function onSubmit() {
    // setisLoading(true)
    seterrorMsg('');
    setsuccessMsg('');
    setisLoading(true)
   await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({data})=>{
    setisLoading(false)
    console.log(data);
    setsuccessMsg(data.message)
    setUserToken(data.token);
    localStorage.setItem("token", data.token)
  // setTimeout(() => {
  //   navigate('/')
  // }, 500);
    if (location.pathname == "/login"){
      navigate('/')
    }else{
      navigate(location.pathname)

    }
    
  }).catch((err)=>{
    setisLoading(false)
  console.log(err.response.data.message);
  seterrorMsg(err.response.data.message)
  
  })
    // let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
    // setisLoading(false)
    // console.log(data);
  }

  return (
    <>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8"> ㋡ Welcome Ya Sahby ㋡</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={values.email}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />
            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={values.password}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />
            {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading}>Login
          {isLoading &&    <ClipLoader
       
       size={10}
       aria-label="Loading Spinner"
       data-testid="loader"
     />}
          
          
          </button>
          {errorMsg && <p className='text-red-500'>{errorMsg}</p>}      
  {successMsg && <p className='text-green-500'>{successMsg}</p>}
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Register 
          </Link>
        </div>
      </div>
    </>
  );
}
