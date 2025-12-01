"use client"
import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:"user"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("")

        if(formData.password.length < 6){
            setLoading(false)
            setError("password must be at least 6 characters")
            return;
        }
        try {
            const response=await fetch("/api/register",{
                method:"POST",
            headers:{"Content-Type":"application/json",},
                body:JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                })
            })
            const data=await response.json()
            if(response.ok){
                router.push("/login")
            }
            else {
                setError(data.message || "registration failed");
            }
        }catch(err){
            console.log(err)
            setError("Something went wrong. Please try again.");
        }
        finally{
            setLoading(false);
        }

    }



    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
<div className="header mt-2 text-center">
    <h2 className="text-3xl font-bold text-green-600">Create Account</h2>
    <p className="text-md text-gray-300">Join ServiceHub today</p>
</div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form className="my-4" onSubmit={handleSubmit}>
                    {/*name input*/}
                    <div className="mt-2">
                        <label className="block font-semibold text-gray-800 mb-1">Full Name</label>
                        <input className="w-full focus:outline-none border px-3 py-2 rounded-lg border-gray-300
                        " type="text"
                               name="name"
                               value={formData.name}
                               onChange={handleChange}
                               placeholder="enter your full name"/>
                    </div>
                    {/*email input*/}
                    <div className="mt-2">
                        <label className="block font-semibold text-gray-800 mb-1"> Email</label>
                        <input className="w-full focus:outline-none border px-3 py-2 rounded-lg border-gray-300
                        " type="text"
                               name="email"
                               onChange={handleChange}
                               value={formData.email}
                               placeholder="enter your email"/>
                    </div>
                    {/*password input*/}
                    <div className="mt-2" >
                        <label className="block font-semibold text-gray-800 mb-1">Password</label>
                        <input className="w-full focus:outline-none border px-3 py-2 rounded-lg border-gray-300
                        " type="password"
                               name="password"
                               onChange={handleChange}
                               value={formData.password}
                               placeholder="enter your password"/>
                    </div>
                    {/*role select*/}
                    <div className="mt-2">
                        <label className="block font-semibold text-gray-800 mb-1">I want to</label>
                        <select
                            className="w-full focus:outline-none border px-3 py-2 rounded-lg border-gray-300"
                        name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value={"user"}>Find Service</option>
                            <option value={"provider"}>Provide Service</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <button
                            disabled={loading}
                            className="w-full bg-green-600 rounded-lg px-4 py-2 hover:bg-green-700
                        transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
                            {loading ? "Creating account..." : "Creating account"}
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="">Already have an account?{" "}
                        <Link className="text-blue-500" href={"/login"}>Login</Link>
                        </p>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default RegisterPage;