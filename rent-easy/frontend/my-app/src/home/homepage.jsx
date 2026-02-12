import React from 'react'
import 'flowbite'
export default function Homepage() {
    return (
        <div className="pt-20">
            <div className="pt-20">
                <div className="min-h-[70vh] flex flex-col md:flex-row">

                    {/* Left Div */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center p-8">

                        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-4">
                            Rent. Live. Repeat
                        </h1>

                        <p className="text-center md:text-left max-w-md text-lg">
                            Premium furniture & appliances on flexible monthly plans.
                            No upfront costs, free delivery, and hassle-free maintenance
                        </p>

                        <div className="mt-6 flex gap-4 flex-wrap justify-center md:justify-start">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Explore Products
                            </button>

                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                How it works
                            </button>
                        </div>

                    </div>

                    {/* Right Div */}
                    <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSFmLqo2iXvQ1V22vIY-ExyiguveFYR1F4uQ&s"
                            alt="Example"
                            className="max-w-full h-auto"
                        />
                    </div>

                </div>
            </div>


            {/* additional info about the company */}
            <div className="h-[40vh] flex flex-col items-center justify-center text-center px-6">

                <span className="text-green-600 text-sm font-medium">
                    Why RentEase
                </span>

                <h1 className="text-4xl font-bold mt-3">
                    Renting Made Simple
                </h1>

                <p className="text-base mt-3 text-gray-600 max-w-2xl">
                    Experience the freedom of flexibility without the burden of ownership
                </p>

            </div>



            {/* cards div for the feclitity's*/}
            <div className="w-full py-16 flex flex-wrap justify-center gap-8">

                {/* Card */}
                <div className="w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] p-6 rounded-xl
                      border border-green-500/20
                      flex flex-col
                      transition-all duration-300
                      hover:shadow-[0_0_25px_rgba(34,197,94,0.09)]">
                    <img src="https://via.placeholder.com/40" alt="logo" className="w-10 h-10 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Flexible Plans</h2>
                    <p className="text-sm text-gray-600">
                        Choose rental plans that fit your lifestyle.
                    </p>
                </div>

                <div className="w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] p-6 rounded-xl
                      border border-green-500/20
                      flex flex-col
                      transition-all duration-300
                      hover:shadow-[0_0_25px_rgba(34,197,94,0.09)]">
                    <img src="https://via.placeholder.com/40" alt="logo" className="w-10 h-10 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Free Delivery</h2>
                    <p className="text-sm text-gray-600">
                        Free doorstep delivery and setup.
                    </p>
                </div>

                <div className="w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] p-6 rounded-xl
                      border border-green-500/20
                      flex flex-col
                      transition-all duration-300
                      hover:shadow-[0_0_25px_rgba(34,197,94,0.09)]">
                    <img src="https://via.placeholder.com/40" alt="logo" className="w-10 h-10 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No Upfront Cost</h2>
                    <p className="text-sm text-gray-600">
                        Start without heavy upfront payments.
                    </p>
                </div>

                <div className="w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] p-6 rounded-xl
                      border border-green-500/20
                      flex flex-col
                      transition-all duration-300
                      hover:shadow-[0_0_25px_rgba(34,197,94,0.09)]">
                    <img src="https://via.placeholder.com/40" alt="logo" className="w-10 h-10 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Easy Maintenance</h2>
                    <p className="text-sm text-gray-600">
                        We handle repairs and maintenance.
                    </p>
                </div>

                <div className="w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] p-6 rounded-xl
                      border border-green-500/20
                      flex flex-col
                      transition-all duration-300
                      hover:shadow-[0_0_25px_rgba(34,197,94,0.09)]">
                    <img src="https://via.placeholder.com/40" alt="logo" className="w-10 h-10 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Upgrade Anytime</h2>
                    <p className="text-sm text-gray-600">
                        Switch products whenever needed.
                    </p>
                </div>

                <div className="w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] p-6 rounded-xl
                      border border-green-500/20
                      flex flex-col
                      transition-all duration-300
                      hover:shadow-[0_0_25px_rgba(34,197,94,0.09)]">
                    <img src="https://via.placeholder.com/40" alt="logo" className="w-10 h-10 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Premium Quality</h2>
                    <p className="text-sm text-gray-600">
                        High-quality furniture & appliances.
                    </p>
                </div>

            </div>



            {/* head div for categories section  */}
            <div className="w-full h-[20vh] px-8 
                flex flex-col justify-center 
                md:flex-row md:items-end md:justify-between">

                {/* Left Content */}
                <div>
                    <span className="text-green-600 font-medium">
                        Categories
                    </span>

                    <h2 className="text-2xl font-bold mt-2">
                        Browse by Category
                    </h2>
                </div>

                {/* Button */}
                <div className="mt-4 md:mt-0">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition">
                        All Products
                    </button>
                </div>

            </div>



            {/* card of product category */}
            <div className="w-full py-16 flex flex-wrap justify-center gap-8">

                {/* Card 1*/}
                <div className="relative w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] 
                      overflow-hidden rounded-xl group cursor-pointer">
                    {/* Image */}
                    <img
                        src="https://via.placeholder.com/600x400"
                        alt="Flexible Plans"
                        className="w-full h-full object-cover
                     transition-transform duration-500
                     group-hover:scale-110"
                    />

                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Text Bottom Left */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-xl font-semibold">
                            Flexible Plans
                        </h2>
                    </div>
                </div>

                {/* Card 2*/}
                <div className="relative w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] 
                      overflow-hidden rounded-xl group cursor-pointer">
                    {/* Image */}
                    <img
                        src="https://via.placeholder.com/600x400"
                        alt="Flexible Plans"
                        className="w-full h-full object-cover
                     transition-transform duration-500
                     group-hover:scale-110"
                    />

                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Text Bottom Left */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-xl font-semibold">
                            Flexible Plans
                        </h2>
                    </div>
                </div>

                {/* Card 3*/}
                <div className="relative w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] 
                      overflow-hidden rounded-xl group cursor-pointer">
                    {/* Image */}
                    <img
                        src="https://via.placeholder.com/600x400"
                        alt="Flexible Plans"
                        className="w-full h-full object-cover
                     transition-transform duration-500
                     group-hover:scale-110"
                    />

                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Text Bottom Left */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-xl font-semibold">
                            Flexible Plans
                        </h2>
                    </div>
                </div>

                {/* Card 4*/}
                <div className="relative w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] 
                      overflow-hidden rounded-xl group cursor-pointer">
                    {/* Image */}
                    <img
                        src="https://via.placeholder.com/600x400"
                        alt="Flexible Plans"
                        className="w-full h-full object-cover
                     transition-transform duration-500
                     group-hover:scale-110"
                    />

                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Text Bottom Left */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-xl font-semibold">
                            Flexible Plans
                        </h2>
                    </div>
                </div>

                {/* Card 5*/}
                <div className="relative w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] 
                      overflow-hidden rounded-xl group cursor-pointer">
                    {/* Image */}
                    <img
                        src="https://via.placeholder.com/600x400"
                        alt="Flexible Plans"
                        className="w-full h-full object-cover
                     transition-transform duration-500
                     group-hover:scale-110"
                    />

                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Text Bottom Left */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-xl font-semibold">
                            Flexible Plans
                        </h2>
                    </div>
                </div>


                {/* Card 6*/}
                <div className="relative w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] 
                      overflow-hidden rounded-xl group cursor-pointer">
                    {/* Image */}
                    <img
                        src="https://thumbs.dreamstime.com/b/autumn-nature-landscape-colorful-forest-autumn-nature-landscape-colorful-forest-morning-sunlight-131400332.jpg"
                        alt="Flexible Plans"
                        className="w-full h-full object-cover
                     transition-transform duration-500
                     group-hover:scale-110"
                    />

                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Text Bottom Left */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-xl font-semibold">
                            Flexible Plans
                        </h2>
                    </div>
                </div>

            </div>



            {/* how it works */}
            <div className="w-full py-16 px-6 flex flex-col items-center text-center">

                <span className="text-green-600 font-medium text-sm">
                    Process
                </span>

                <h2 className="text-3xl font-bold mt-2">
                    How It Works
                </h2>

                <span className="mt-4 text-base text-gray-600 max-w-2xl">
                    Getting started is simple. Four easy steps to a fully furnished space.
                </span>

            </div>



            <div className="w-full py-16 px-6 flex flex-col gap-12">

                {/* Step 01 */}
                <div className="max-w-xl">

                    <div className="flex items-center gap-4">
                        <img
                            src="https://cdn.vectorstock.com/i/1000v/76/89/truck-logo-vector-45757689.jpg"
                            alt="icon"
                            className="w-10 h-10"
                        />
                        <h1 className="text-5xl font-bold text-green-600/40">
                            01
                        </h1>
                    </div>

                    <h2 className="text-2xl font-semibold mt-4">
                        Browse & Select
                    </h2>

                    <span className="block mt-3 text-gray-600">
                        Explore our wide range of furniture and appliances.
                        Filter by category, price, or tenure.
                    </span>

                </div>

                {/* Step 02 */}
                <div className="max-w-xl">

                    <div className="flex items-center gap-4">
                        <img src="https://via.placeholder.com/40" alt="icon" className="w-10 h-10" />
                        <h1 className="text-5xl font-bold text-green-600/40">
                            02
                        </h1>
                    </div>

                    <h2 className="text-2xl font-semibold mt-4">
                        Choose Your Plan
                    </h2>

                    <span className="block mt-3 text-gray-600">
                        Select your preferred rental tenure - 3, 6, or 12 months.
                        Add to cart and checkout.
                    </span>

                </div>

                {/* Step 03 */}
                <div className="max-w-xl">

                    <div className="flex items-center gap-4">
                        <img src="https://via.placeholder.com/40" alt="icon" className="w-10 h-10" />
                        <h1 className="text-5xl font-bold text-green-600/40">
                            03
                        </h1>
                    </div>

                    <h2 className="text-2xl font-semibold mt-4">
                        Schedule Delivery
                    </h2>

                    <span className="block mt-3 text-gray-600">
                        Pick a convenient delivery date. We'll deliver, install,
                        and set everything up.
                    </span>

                </div>

                {/* Step 04 */}
                <div className="max-w-xl">

                    <div className="flex items-center gap-4">
                        <img src="https://via.placeholder.com/40" alt="icon" className="w-10 h-10" />
                        <h1 className="text-5xl font-bold text-green-600/40">
                            04
                        </h1>
                    </div>

                    <h2 className="text-2xl font-semibold mt-4">
                        Enjoy & Relax
                    </h2>

                    <span className="block mt-3 text-gray-600">
                        Use your rentals worry-free. Extend, swap, or return
                        when your plan ends.
                    </span>

                </div>

            </div>





            <div className="w-full bg-[#0e1829] text-white px-8 py-16">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* LEFT SECTION */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            <span className="text-green-500">Rent</span>
                            <span className="text-white">Ease</span>
                        </h2>

                        <span className="block mt-4 text-gray-400 max-w-sm">
                            Premium furniture & appliances on flexible monthly rentals.
                            Making urban living affordable and convenient.
                        </span>

                        <div className="mt-6 space-y-4 text-gray-300">

                            <div className="flex items-center gap-3">
                                <img
                                    src="https://via.placeholder.com/18"
                                    alt="phone"
                                    className="w-4 h-4"
                                />
                                <span>1800-123-4567</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <img
                                    src="https://via.placeholder.com/18"
                                    alt="email"
                                    className="w-4 h-4"
                                />
                                <span>support@rentease.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <img
                                    src="https://via.placeholder.com/18"
                                    alt="location"
                                    className="w-4 h-4"
                                />
                                <span>Multiple cities across India</span>
                            </div>

                        </div>
                    </div>


                    {/* MIDDLE SECTION */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3 text-gray-400">
                            <a href="#" className="hover:text-white transition">
                                Browse Products
                            </a>
                            <a href="#" className="hover:text-white transition">
                                My Rentals
                            </a>
                            <a href="#" className="hover:text-white transition">
                                Cart
                            </a>
                        </div>
                    </div>


                    {/* RIGHT SECTION */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Categories
                        </h3>

                        <div className="flex flex-col gap-3 text-gray-400">
                            <a href="#" className="hover:text-white transition">
                                Furniture
                            </a>
                            <a href="#" className="hover:text-white transition">
                                Appliances
                            </a>
                        </div>
                    </div>

                </div>

            </div>





        </div>

    );
}