import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, publicRequest } from '../requestMethod'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cPassword: "",
        username: ""

    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await publicRequest.post(`${BASE_URL}/auth/register`, formData)
            console.table(res.data)
            navigate("/login", { replace: true })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="max-w-md relative flex flex-col p-4 m-auto min-h-svh justify-center border  rounded-md text-black bg-white">
            <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">App</span></div>
            <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Create your account</div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className=" relative justify-between flex">
                    <div className="">
                        <label htmlFor="firstName" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">First Name</label>
                        <input onChange={handleChange} type="text" id="firstName" name='firstName' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />
                    </div>
                    <div className="">
                        <label htmlFor="lastName" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Last Name</label>
                        <input onChange={handleChange} type="text" id="lastName" name='lastName' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />
                    </div>

                </div>
                <div className="block relative">
                    <label htmlFor="username" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
                    <input onChange={handleChange} type="text" id="username" name='username' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />

                </div>
                <div className="block relative">
                    <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                    <input onChange={handleChange} type="text" id="email" name='email' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />

                </div>
                <div className="block relative">
                    <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                    <input onChange={handleChange} type="text" id="password" name='password' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
                </div>
                <div className="block relative">
                    <label htmlFor="cPassword" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Confirm Password</label>
                    <input onChange={handleChange} type="text" id="cPassword" name='cPassword' className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
                </div>
                <div>
                    <Link className="text-sm text-[#7747ff]" href="#">Forgot your password?
                    </Link></div>
                <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

            </form>
            <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <Link className="text-sm text-[#7747ff]" to={"/login"}>Sign up for free!</Link></div>
        </div>
    )
}

export default Register