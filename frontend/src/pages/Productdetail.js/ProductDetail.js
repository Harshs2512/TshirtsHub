import React, { useState, useEffect } from 'react';
import { UilChart, UilHeartAlt, UilShoppingCart, UilRedo, UilDropbox, UilTruck, UilProcess } from '@iconscout/react-unicons';
import './ProductDetail.css'; // Import your custom CSS file
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './ProductDetail.css';
import Layout from '../../components/Layout/Layout'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Radio } from 'antd';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../context/cart';
import { useWishlist } from '../../context/wishlist';
import { Spin } from 'antd';
import sizeChart from './t-shirt-size-chart.jpg'



const ProductDetail = () => {
    const params = useParams();
    const [sizeselect, setSizeselect] = useState(null);
    const [colorselect, setColorselect] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [wishlist, setWishlist] = useWishlist();
    const [loading, setLoading] = useState(true); // Loading state
    const [product, setProduct] = useState({});
    const [showSizeChart, setShowSizeChart] = useState(false);

    const handleSizeselect = (buttonId) => {
        setSizeselect(buttonId);
    };
    const handleColorselect = (color) => {
        setColorselect(color)
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const increaseQuantity = () => {
        if (product.quantity > quantity) {
            setQuantity(quantity + 1);
        }
    };
    const scrollLeft = () => {
        document.getElementById("img").scrollLeft -= 440;
    };
    const scrollRight = () => {
        document.getElementById("img").scrollLeft += 440;
    };


    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `https://tshirts-8vepwq22n-harshs2512.vercel.app/api/v1/products/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `https://tshirts-8vepwq22n-harshs2512.vercel.app/api/v1/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    const updatedProduct = {
        category: product.category,
        color: product.color,
        description: product.description,
        discounted_price: product.discounted_price,
        selling_price: product.selling_price,
        quantity: quantity,
        size: sizeselect,
        title: product.title,
        _id: product._id
    }

    console.log(updatedProduct)

    const handleAddToCart = () => {
        if (!sizeselect) {
            toast.error('Please select a size');
            return;
        }
        setCart([...cart, updatedProduct]);
        localStorage.setItem(
            "cart",
            JSON.stringify([...cart, updatedProduct])
        );
        toast.success("Item Added to cart");
    };

    const toggleSizeChart = () => {
        setShowSizeChart(!showSizeChart);
    };
    return (
        <Layout title="productdelail">
            <ToastContainer />
            <div className='grid lg:grid-cols-8 grid-rows-8 pt-16 px-5'>
                <div className='grid grid-flow-col-dense lg:grid-flow-row-dense lg:order-1 order-2 mt-5 lg:h-[calc(100vh-0px)] lg:overflow-y-auto overflow-x-auto scrollbar-hide'>
                    <div className='lg:w-20 lg:h-28 w-32 m-3 lg:ml-5 ml-0'>
                        <img src='https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSD3593-01-3212350_720x.jpg?v=1686895093' />
                    </div>
                    <div className='lg:w-20 lg:h-28 w-32 m-3 lg:ml-5 ml-0'>
                        <img src='https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSD3593-01-3212350_720x.jpg?v=1686895093' />
                    </div>
                    <div className='lg:w-20 lg:h-28 w-32 m-3 lg:ml-5 ml-0'>
                        <img src='https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSD3593-01-3212350_720x.jpg?v=1686895093' />
                    </div>
                    <div className='lg:w-20 lg:h-28 w-32 m-3 lg:ml-5 ml-0'>
                        <img src='https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSD3593-01-3212350_720x.jpg?v=1686895093' />
                    </div>
                    <div className='lg:w-20 lg:h-28 w-32 m-3 lg:ml-5 ml-0'>
                        <img src='https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSD3593-01-3212350_720x.jpg?v=1686895093' />
                    </div>
                    <div className='lg:w-20 lg:h-28 w-32 m-3 lg:ml-5 ml-0'>
                        <img src='https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSD3593-01-3212350_720x.jpg?v=1686895093' />
                    </div>
                </div>
                <div className='lg:col-span-3 row-span-3 m-5 lg:order-2 order-1'>
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                    >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <React.Fragment>
                                <div className="tools grid grid-cols-3">
                                    <button onClick={() => zoomIn()}>
                                        <div className="w-10 h-10 bg-blue-400/50 rounded-full absolute z-10 left-[8rem] lg:left-[20rem] xs:transform xs:-translate-x-1/2 -translate-y-1/2 lg:top-[35rem] top-[27rem] text-2xl font-extrabold text-white">
                                            +
                                        </div>
                                    </button>
                                    <button onClick={() => resetTransform()}>
                                        <div className="w-10 h-10 bg-blue-400/50 rounded-full absolute z-10 left-[12rem] lg:left-[24rem] transform -translate-x-1/2 lg:top-[23.4em] top-[27rem] text-2xl font-extrabold text-white p-2">
                                            <UilRedo />
                                        </div>
                                    </button>
                                    <button onClick={() => zoomOut()}>
                                        <div className="w-10 h-10 bg-blue-400/50 rounded-full absolute z-10 left-[16rem] lg:left-[28rem] transform -translate-x-1/2 lg:top-[35rem] top-[27rem] text-2xl font-extrabold text-white">
                                            -
                                        </div>
                                    </button>
                                </div>
                                <TransformComponent>
                                    <img src={`http://localhost:8000/api/v1/product-photo/${product._id}`} alt="(test)" />
                                </TransformComponent>
                            </React.Fragment>
                        )}
                    </TransformWrapper>
                </div>
                <div className='lg:col-span-4 row-span-4 lg:m-8 lg:order-3 order-3 text-center lg:text-left lg:mt-0 mt-16'>
                    <h1 className='md:font-lg font-medium text-gray-500 text-lg'>TshirtHub</h1>
                    <h1 className='md:font-bold font-semibold text-gray-900 text-5xl mt-2'>{product && product.title}</h1>
                    <h1 className='font-lg text-gray-500 text-base mt-1'>{product.category && product.category.catName}</h1>
                    <hr className='mt-1' />
                    <div className='flex mt-5 justify-center lg:justify-start'>
                        <h1 className='font-lg text-3xl text-gray-800 text-center'>{product && product.selling_price}</h1>
                        <h1 className='font-normal text-xl text-gray-400 line-through ml-5 '>{product && product.discounted_price}</h1>
                        <h1 className='font-normal text-xl text-red-600 ml-5 text-right'>20%</h1>
                    </div>
                    <div>
                        <div className='flex mt-8 justify-center lg:justify-start'>
                            <h1 className='font-bold text-lg text-gray-900'>Select your size: </h1>
                            <Link><h1 className='font-normal text-base text-red-600 ml-3 underline flex' onClick={toggleSizeChart}>Size chart <span className='ml-2'>
                                <UilChart />
                            </span></h1></Link>
                            {/* Size Chart Modal */}
                            {showSizeChart && (
                                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-1/2 h-2/1 top-20 left-72">
                                    <div className="bg-white p-4">
                                        <img src={sizeChart} />
                                        <button
                                            type="button"
                                            onClick={toggleSizeChart}
                                            className="text-white text-xl font-bold -mt-2 hover:text-gray-700 focus:outline-none absolute top-2 right-2 "
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='mt-4 flex lg:justify-start justify-center'>
                            {product && product.size && product.size[0].split(',').map((s, index) => (
                                <button
                                    key={index}
                                    type="select"
                                    value={s}
                                    className={`text-gray-900 bg-white border-2 font-medium rounded-xl text-sm px-4 py-1 mr-2 mb-2 ${sizeselect === s ? 'border-red-900' : 'border-gray-300'
                                        }`}
                                    onClick={() => handleSizeselect(s)}
                                >
                                    <span>{s}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className='mt-6'>
                            <h1 className='font-bold text-lg text-gray-900 flex'>Colors: <span className='text-fuchsia-900 lg:first-letter:ml-4 ml-2 uppercase'>{product && product.color}</span></h1>
                        </div>
                        <div className='mt-3 lg:block flex '>
                            <h1 className='font-bold text-lg text-gray-900 lg:mt-1 mt-4'>Quantity:</h1>
                            <div className="flex items-center mt-3 ml-2 lg:ml-0">
                                <button
                                    className="px-3 py-1 rounded-l bg-gray-200 hover:bg-gray-300 text-xl"
                                    onClick={decreaseQuantity}>-
                                </button>
                                <span className="px-3 py-1 text-lg">{quantity}</span>
                                <button
                                    className="px-3 py-1 rounded-r text-xl bg-gray-200 hover:bg-gray-300"
                                    onClick={increaseQuantity}>+
                                </button>
                            </div>
                        </div>
                    </div>

                    <hr className='mt-5' />
                    <div className='mt-5 lg:flex lg:ml-0 ml-12'>
                        {!cart.find((item) => item._id === product._id) ? (
                            <button type="button" class="focus:outline-none text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-[15px] lg:px-16 px-5 py-2 mb-2 ml-2 mr-5 flex pt-3"
                                onClick={handleAddToCart}
                            ><span className='mr-2'><UilShoppingCart /></span>Add to Cart
                            </button>
                        ) : (
                            <Link to='/cart'>
                                <button type="button" class="focus:outline-none text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-full lg:text-[15px] text-lg lg:px-16 px-16 lg:py-3 mb-2 pb-2 ml-2 lg:mr-5 mr-10 flex pt-3"
                                ><span className='mr-2'><UilShoppingCart /></span>Go To Cart
                                </button></Link>)}

                        <button disabled={!wishlist.find((item) => item._id === product._id) ? false : true} type="button" class={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mb-5 lg:mt-0 mt-5 flex ${!wishlist.find((item) => item._id === product._id) ? 'px-16' : 'bg-blue-800 text-white px-12 '}`}
                            onClick={() => {
                                setWishlist([...wishlist, product]);
                                localStorage.setItem(
                                    "wishlist",
                                    JSON.stringify([...wishlist, product])
                                );
                                toast.success("Item Added to Wishlist");
                            }}
                        >
                            <span className='mr-2'><UilHeartAlt className={`${!wishlist.find((item) => item._id === product._id) ? '' : 'animate-jump-in animate-delay-300 animate-once'}`} /></span>
                            {!wishlist.find((item) => item._id === product._id) ? 'Add to Whishlist' : 'Added to WhishList'}
                        </button>
                    </div>
                    <div className='mt-5'>
                        <h1 className='font-bold text-lg text-gray-900'>Product Description</h1>
                        <p className='text-base text-gray-500 mt-2'>
                            {product && product.description}
                        </p>
                    </div>
                    <div className='mt-5'>
                        <h1 className='font-bold text-lg text-gray-900'>Product Feature</h1>
                        <p className='text-base text-gray-500 mt-2'>
                            <ul>
                                <li>adfasd</li>
                                <li>adfasd</li>
                                <li>adfasd</li>
                                <li>adfasd</li>
                            </ul>
                        </p>
                    </div>
                    <div className='mt-5 grid grid-cols-3 text-center lg:text-base text-xs text-white bg-purple-800 gap-3 lg:px-5 px-1 lg:py-2 py-1'>
                        <Link>
                            <UilDropbox className="md:w-16 md:h-16 w-12 h-12 lg:ml-[55px] ml-[26px]" />
                            <p className='uppercase'>100+</p>
                            <p className='uppercase'>Happy Customers</p>
                        </Link>
                        <Link>
                            <UilTruck className="md:w-16 md:h-16 w-12 h-12 lg:ml-[55px] ml-[26px]" />
                            <p className='uppercase'>Home Delevery</p>
                            <p className='uppercase'>Cash on Delevery</p>
                        </Link>
                        <Link>
                            <UilProcess className="md:w-16 md:h-16 w-12 h-12 lg:ml-[55px] ml-[29px]" />
                            <p className='uppercase'>our</p>
                            <p className='uppercase'>return policy</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-4xl font-bold tracking-widest text-center py-10 text-[#7570ff] mt-9 uppercase'>You May Also Like</h1>
                <div className="flex">
                    <button onClick={scrollLeft} className="p-2 m-2  bg-white rounded-full" >
                        <FiChevronLeft className='w-10 h-10' />
                    </button>
                    <div id="img" className="flex p-1 gap-10 overflow-x-auto duration-200 scroll-smooth scrollbar-hide">
                        {relatedProducts && relatedProducts.map((p) => (
                            <div
                                key={p._id} className="block bg-gray-100/50 shadow-2xl rounded-lg">
                                <Link to={`/product/${p.slug}`} >
                                    <img
                                        className="rounded-lg"
                                        src={`http://localhost:8000/api/v1/product-photo/${p._id}`}
                                        alt="" />
                                    <div className="px-3 mt-1">
                                        <h5
                                            className="mb-2 text-lg font-medium leading-tight text-neutral-700">
                                            {p && p.title}
                                        </h5>
                                        <p className="mb-1 text-lg text-neutral-600">
                                            {p && p.category.catName}
                                        </p>
                                        <hr />
                                    </div>
                                    <div className='flex px-3'>
                                        <p className="mb-2 text-base font-bold text-neutral-900">
                                            ₹{p && p.selling_price}
                                        </p>
                                        <p className="mb-1 ml-8 font-bold text-base line-through text-red-500">
                                            ₹{p && p.discounted_price}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <button onClick={scrollRight} className="p-2 m-2 bg-white rounded-full"  >
                        <FiChevronRight className='w-10 h-10' />
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetail;

