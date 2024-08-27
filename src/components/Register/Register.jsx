
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import ClipLoader from "react-spinners/ClipLoader";

export default function Register() {
const [errorMsg, seterrorMsg] = useState('');
const [successMsg, setsuccessMsg] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate()
  const { handleSubmit, values, handleChange, errors, touched , handleBlur} = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    onSubmit: register,
    // validate: validateData
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(2,'Name must be more than 2 characters ' ).max(20,'Name must be less than 20 characters'),
      email: Yup.string().required('Email is required').email('Enter valid email'),
      password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Minimum eight characters, at least one letter, one number and one special character'),
     rePassword: Yup.string().required('Repassword is required').oneOf([Yup.ref('password')], 'Password and Repassword must be same:'),
     phone: Yup.string().required('Phone is required')

    })
  });

  // function validateData(values) {
  //   let errors = {};
  //   if (values.name==0) {
  //     errors.name = 'Name is required';
  //   }else if (values.name.length<2){
  //     errors.name = 'Name must be more than 2 characters ';
  //   }else if(values.name.length>20){
  //     errors.name = 'Name must be less than 20 characters';
  //   }


    
 

  //   if (values.phone==0) {
  //     errors.phone = 'Phone is required';
  //   }
  //   if (values.email==0) {
  //     errors.email = 'Email is required';
  //   }
  //   if (values.password==0) {
  //     errors.password = 'Password is required';
  //   } else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password)!=true){
  //     errors.password='Minimum eight characters, at least one letter, one number and one special character:'
  //   }
  //   if (values.rePassword==0) {
  //     errors.rePassword = 'Repassword is required';
  //   }else if(values.rePassword!=values.password){
  //     errors.rePassword = 'Password and Repassword must be same:'
  //   }
  //   return errors;
    
  // }

 async function register() {
  seterrorMsg('');
  setsuccessMsg('');
  setisLoading(true)
 await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({data})=>{
  setisLoading(false)
  console.log(data);
  setsuccessMsg(data.message)
setTimeout(() => {
  navigate('/login')
}, 2000);
  
}).catch((err)=>{
  setisLoading(false)
console.log(err.response.data.message);
seterrorMsg(err.response.data.message)

})


  }

  return (
    <>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My Company</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">User Name:</label>
            <input 
            onBlur={handleBlur}
              onChange={handleChange} 
              type="text" 
              id="name" 
              name="name" 
              value={values.name} 
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />
            {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
            <input 
                        onBlur={handleBlur}

              onChange={handleChange} 
              type="tel" 
              id="phone" 
              name="phone" 
              value={values.phone} 
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />

            {errors.phone && touched.phone && <div className="text-red-500">{errors.phone}</div>}
          </div>

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

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="rePassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Repassword:</label>
            <input 
                        onBlur={handleBlur}

              onChange={handleChange} 
              type="password" 
              id="rePassword" 
              name="rePassword" 
              value={values.rePassword} 
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />
                        

            {errors.rePassword && touched.rePassword && <div className="text-red-500">{errors.rePassword}</div>}
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading}>Register 
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
          <Link href="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
        </div>
      </div>
    </>
  );
}
