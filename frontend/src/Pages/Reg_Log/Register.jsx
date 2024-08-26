import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Context/Context'
import axios from 'axios'
import { SiSunrise } from "react-icons/si";
import { useError } from '../../Context/ErrorContext';

function Register() {
  const { toggleAuthPage } = useAuth();
  const [formData, setFormData] = useState({})
  const { triggerError } = useError();
  const navigate = useNavigate()


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function postRegister() {
    console.log(formData)
    axios.post("api/v1/users/register", formData)
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        triggerError(err)
      })
  }

  return (
    <div className="bg-orange-50 w-screen h-screen flex items-center justify-center">
      <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4 rounded-xl p-6 py-10 bg-white flex flex-col gap-4 items-center">
        <div className="aspect-square w-16 bg-orange-200 rounded-full grid place-items-center"><SiSunrise className='text-red-600 text-4xl'/></div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Weather Signup</h1>
        <h2 className="text-sm text-center px-2">Hey, Enter your details to sign up for your account.</h2>
        <input
          onChange={handleInputChange}
          name="fullName"
          className="outline-none p-2 border border-neutral-300 w-full rounded-md"
          type="text"
          placeholder="Full Name"
        />
        <input
          onChange={handleInputChange}
          name="email"
          className="outline-none p-2 border border-neutral-300 w-full rounded-md"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={handleInputChange}
          name="userName"
          className="outline-none p-2 border border-neutral-300 w-full rounded-md"
          type="text"
          placeholder="Username"
        />
        <input
          onChange={handleInputChange}
          name="password"
          className="outline-none p-2 border border-neutral-300 w-full rounded-md"
          type="password"
          placeholder="Passcode"
        />
        <button
          onClick={postRegister}
          className="w-full rounded-lg bg-orange-100 p-2 font-semibold hover:bg-orange-200 transition-all"
        >
          Sign Up!
        </button>
        <p className="text-sm text-center">
          Already have an account?
          <b
            className="font-bold text-sm cursor-pointer hover:text-orange-600 transition-all"
            onClick={toggleAuthPage}
          >
            Login!
          </b>
        </p>
      </div>
    </div>

  )
}

export default Register