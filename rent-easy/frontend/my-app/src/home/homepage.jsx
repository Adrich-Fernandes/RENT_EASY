import { work_flow, Features, Category } from './Alldata'
export default function Homepage() {
    return (
        <div className="pt-10">


            {/* top div*/}
            <div className="min-h-[70vh] flex flex-col md:flex-row">

                {/* LEFT */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-8">

                    <h1 className="text-5xl md:text-6xl font-extrabold text-center md:text-left leading-tight mb-4">
                        Rent. Live.
                        <br />
                        <span className="text-green-600">Repeat</span>
                    </h1>

                    <p className="text-center md:text-left text-lg max-w-lg">
                        Premium furniture & appliances on flexible monthly plans.
                        No upfront costs, free delivery, and hassle-free maintenance.
                    </p>

                    <div className="mt-6 flex gap-4 flex-wrap justify-center md:justify-start">
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
                            Explore Products
                        </button>

                        <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-2 px-6 rounded transition">
                            How it works
                        </button>
                    </div>

                </div>

                {/* RIGHT */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">

                    <div className="relative w-full h-full">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-green-400/20 blur-3xl rounded-3xl -z-10"></div>

                        {/* Main Image */}
                        <img
                            src="https://plus.unsplash.com/premium_photo-1681046751108-a516bea00570?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                            alt="Sofa"
                            className="w-full h-full object-cover rounded-3xl"
                        />

                        {/* Card 1 */}
                        <div className="absolute top-6 left-6 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
                            <img
                                src="https://www.lg.com/content/dam/channel/wcms/global/lg-experience/tech-hub/what-is-a-smart-tv/desktop/desktop-aem-what-is-a-smartv.jpg"
                                alt="TV"
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-semibold">TV Table</p>
                                <p className="text-green-600 text-sm">₹1000 / Month</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="absolute bottom-6 right-6 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
                            <img
                                src="https://www.electroluxarabia.com/contentassets/a8462da74c384f7da463f95a3a2cfc20/how-to-clean-washing-machine-banner.jpg?width=464"
                                alt="Washing Machine"
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-semibold">Washing Machine</p>
                                <p className="text-green-600 text-sm">₹1000 / Month</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>



            {/* additional info about the company */}
            <div className="h-[40vh] flex flex-col items-center justify-center text-center px-6">

                <span className="text-green-600 text-sm font-medium">Why RentEase</span>
                <h1 className="text-4xl font-bold mt-3">Renting Made Simple</h1>
                <p className="text-base mt-3 text-gray-600 max-w-2xl">Experience the freedom of flexibility without the burden of ownership</p>

            </div>



            {/* cards div for the feclitity's*/}
            <div className="w-full py-16 flex flex-wrap justify-center gap-8">
                {/* Card */}
                {
                    Features.map((v, i) => (
                        <Featurecard data={v} />
                    ))
                }

            </div>



            {/* head div for categories section  */}
            <div className="w-full h-[20vh] px-8 flex flex-col justify-center md:flex-row md:items-end md:justify-between">

                {/* Left Content */}
                <div>
                    <span className="text-green-600 font-medium">Categories</span>

                    <h2 className="text-4xl font-bold mt-2">Browse by Category</h2>
                </div>

                {/* Button */}
                <div className="mt-4 md:mt-0">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition">All Products</button>
                </div>

            </div>
            {/* card of product category */}
            <div className="w-full py-16 flex flex-wrap justify-center gap-8">

                {/* n number of cards*/}
                {
                    Category.map((v, i) => (
                        <Categorycard data={v} />
                    ))
                }

            </div>




            {/* how it works */}
            <div className="w-full min-h-[50vh] flex flex-col items-center justify-center px-6 py-16 bg-white">
                {/* TOP CENTER CONTENT */}
                <div className="text-center max-w-2xl mb-14">
                    <span className="text-green-600 font-bold text-lg">
                        Process
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold mt-3 whitespace-nowrap">
                        How It Works
                    </h1>


                    <span className="block text-gray-500 mt-4 text-lg">
                        Getting started is simple. Four easy steps to a fully furnished space.
                    </span>
                </div>

                {/* CARDS CONTAINER */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* card generator */}
                    {work_flow.map((v, i) => (
                        <Workcard item={v} />
                    ))}
                </div>
            </div>




            {/* footer */}
            <div className="w-full bg-[#0e1829] text-white px-8 py-16">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* LEFT SECTION */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            <span className="text-green-400">Rent</span>
                            <span className="text-white">Ease</span>
                        </h2>

                        <span className="block mt-4 text-gray-400 max-w-sm">
                            Premium furniture & appliances on flexible monthly rentals.
                            Making urban living affordable and convenient.
                        </span>

                        <div className="mt-6 space-y-4 text-gray-300">

                            <div className="flex items-center gap-3">
                                <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/phone-call-white-icon.png" alt="phone" className="w-4 h-4" />
                                <span>1800-123-4567</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/email-envelope-white-icon.png" alt="email" className="w-4 h-4" />
                                <span>support@rentease.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <img src="https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/location-pointer-white-icon.png" alt="location" className="w-4 h-4" />
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

// workflow
function Workcard({ item }) {
    return (
        <div className="relative bg-white border border-gray-100 rounded-3xl p-8 shadow-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]">

            {/* Logo */}
            <img src={item.img} alt="step icon" className="w-18 h-18 mb-6 rounded-2xl object-cover" />

            {/* Count */}
            <p className="text-5xl font-extrabold text-gray-300/70">{item.count}</p>

            {/* Title */}
            <h2 className="text-xl font-bold mt-4">{item.title}</h2>

            {/* Description */}
            <p className="text-gray-500 mt-3 leading-relaxed">{item.description}</p>

        </div>
    )
}

// features
function Featurecard({ data }) {
    return (
        <div className="w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] p-6 rounded-xl border border-green-500/80 flex flex-col transition-all duration-300 hover:shadow-[0_0_35px_rgba(34,197,94,0.35)]">

            <img src={data.img} alt="logo" className="w-15 h-15 mb-4 rounded-2xl" />
            <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
            <p className="text-lg text-gray-600">{data.description}</p>

        </div>
    )
}

// category
function Categorycard({ data }) {
    return (
        <div className="relative w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] overflow-hidden rounded-xl group cursor-pointer">

            {/* Image */}
            <a href=""><img src={data.img} alt="Flexible Plans" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /> </a>

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Text Bottom Left */}
            <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold ">{data.title}</h2>
            </div>

        </div>
    )
}