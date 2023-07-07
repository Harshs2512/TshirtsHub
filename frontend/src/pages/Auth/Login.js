import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from "../../context/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(auth.user)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://tshirts-8vepwq22n-harshs2512.vercel.app/api/v1/login/", {
                email,
                password,
            });
            console.log(res)
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                console.log(res.data.user.role)
                if (res?.data?.user?.role === 'admin') {
                    navigate("/");
                }
                else {
                    navigate("/");
                }
            } else {
                console.log("asdfd");
                toast.error("Wrong username or password");
            }
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error("Wrong username or password");
        }
    };

    useEffect(() => {
        if (!auth.user && !auth.user) {
            navigate('/login');
        }
        else {
            navigate('/account/profile');
        }
    }, [auth.user]);

    return (
        <Layout title={"Login"}>
            <ToastContainer />
            <div className='pt-20'>
                <h1 className='xs:font-semibold md:font-bold text-4xl text-center tracking-widest'>Login</h1>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto md:mt-20 xs:mt-24">
                    <div className="mb-10">
                        <div class="relative z-0 md:w-full xs:w-80 mb-6 group xs:ml-7">
                            <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required />
                            <label htmlFor="floating_pass" class="peer-focus:font-medium absolute text-lg text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Adderess</label>
                        </div>
                    </div>
                    <div className="mb-10">
                        <div class="relative z-0 md:w-full xs:w-80 xs:ml-7 mb-6 group">
                            <input
                                type="password"
                                name="floating_email"
                                id="floating_pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required />
                            <label htmlFor="floating_email" class="peer-focus:font-medium absolute text-lg text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                    </div>
                    <div className='mt-1 xs:mx-7 flex text-sm xs:w-60 md:w-96'>
                        <Link to='/forgetpassword' className="text-blue-500 underline xs:text-sm">
                            Forget Password!
                        </Link>
                        <p className='hidden md:block xs:text-sm ml-16'>
                            Don't have an account
                            <Link to='/signup' className="underline ml-2 xs:text-sm text-blue-500">
                                SignIn
                            </Link>
                        </p>
                    </div>
                    <div className='md:mt-20 md:mb-20 mt-16 flex items-center justify-center md:ml-3'>
                        <button type="submit" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg md:px-16 px-32 py-2.5 text-center mr-2 mb-2 flex">Sign In</button>
                    </div>
                    <p className='block  md:hidden
                     text-center mt-2 text-sm'>
                        Don't have an account?
                        <Link to='/signup' className="ml-2 xs:text-sm  text-blue-600">
                            SING UP NOW
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    )
}
