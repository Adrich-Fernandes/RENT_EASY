import UserNavBar from '../components/userNavBar';
import { work_flow, Features, Category } from '../Alldata'
import { motion } from "framer-motion"
import Footer from '../components/footer'

export default function Homepage() {

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    }

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    return (
        <>
        <UserNavBar />

        <div className="pt-8 overflow-hidden">

            {/* top div*/}
            <motion.div 
                className="min-h-[70vh] flex flex-col md:flex-row"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                

                {/* LEFT */}
<motion.div 
    variants={fadeUp}
    transition={{ duration: 0.6 }}
    className="w-full md:w-[30%] flex flex-col justify-center items-center md:items-start p-8"
>

    <h1 className="text-8xl md:text-6xl font-extrabold text-center md:text-left leading-tight mb-4">
        Rent. Live.
        <br />
        <span className="text-red-600">Repeat</span>
    </h1>

    <p className="text-center md:text-left text-lg max-w-lg text-gray-600">
        Premium furniture & appliances on flexible monthly plans.
        No upfront costs, free delivery, and hassle-free maintenance.
    </p>

    {/* BUTTONS */}
    <div className="mt-6 flex gap-4 flex-wrap justify-center md:justify-start">
        
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md">
            Browse Products →
        </button>

        <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition">
            How It Works
        </button>

    </div>

    {/* SMALL INFO CARDS */}
    <div className="mt-8 flex gap-6 flex-wrap justify-center md:justify-start">

        {/* Card 1 */}
        <div className="flex items-center gap-3 bg-red-100/60 px-4 py-3 rounded-xl">
            <div className="bg-red-200 p-3 rounded-lg">
                🚚
            </div>
            <div>
                <p className="font-semibold text-sm">Free Delivery</p>
                <p className="text-xs text-gray-600">& Installation</p>
            </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-3 bg-red-100/60 px-4 py-3 rounded-xl">
            <div className="bg-red-200 p-3 rounded-lg">
                🛋
            </div>
            <div>
                <p className="font-semibold text-sm">500+ Items</p>
                <p className="text-xs text-gray-600">Available</p>
            </div>
        </div>

    </div>

</motion.div>

                {/* RIGHT */}
<motion.div 
    variants={fadeUp}
    transition={{ duration: 0.6 }}
    className="hidden md:flex md:w-[70%] items-center justify-center p-8"
>
    <div className="relative w-full max-w-4xl">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-red-400/20 blur-3xl rounded-3xl -z-10"></div>

        {/* Main Image */}
        <img
            src="https://plus.unsplash.com/premium_photo-1681046751108-a516bea00570?fm=jpg&q=60&w=3000&auto=format&fit=crop"
            alt="Sofa"
            className="w-full h-[500px] object-cover rounded-3xl"
        />

        {/* TOP LEFT CARD (half outside) */}
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="absolute -left-10 top-20 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4"
        >
            <img
                src="https://plus.unsplash.com/premium_photo-1681046751108-a516bea00570?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                alt="Sofa small"
                className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
                <p className="font-semibold">3-Seater Sofa</p>
                <p className="text-red-600 font-semibold">₹899/mo</p>
            </div>
        </motion.div>

        {/* BOTTOM RIGHT CARD (half outside) */}
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="absolute -right-10 bottom-16 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4"
        >
            <div className="bg-red-100 p-3 rounded-xl text-red-600 text-xl">
                📺
            </div>
            <div>
                <p className="font-semibold">Smart TV 43"</p>
                <p className="text-red-600 font-semibold">₹699/mo</p>
            </div>
        </motion.div>

    </div>
</motion.div>

            </motion.div>

{/* additional info about the company */}
            <div className="h-[40vh] flex flex-col items-center justify-center text-center px-6">

                <span className="text-red-600 text-sm font-medium">Why RentEase</span>
                <h1 className="text-4xl font-bold mt-3">Renting Made Simple</h1>
                <p className="text-base mt-3 text-gray-600 max-w-2xl">Experience the freedom of flexibility without the burden of ownership</p>

            </div>
            {/* cards div for features */}
            <motion.div 
                className="w-full py-16 flex flex-wrap justify-center gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {
                    Features.map((v, i) => (
                        <Featurecard key={i} data={v} />
                    ))
                }
            </motion.div>


            {/* category cards */}
            <div className="w-full h-[20vh] px-8 flex flex-col justify-center md:flex-row md:items-end md:justify-between">

                {/* Left Content */}
                <div>
                    <span className="text-red-600 font-medium">Categories</span>

                    <h2 className="text-4xl font-bold mt-2">Browse by Category</h2>
                </div>

                {/* Button */}
                <div className="mt-4 md:mt-0">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition">All Products</button>
                </div>

            </div>
            <motion.div 
                className="w-full py-16 flex flex-wrap justify-center gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {
                    Category.map((v, i) => (
                        <Categorycard key={i} data={v} />
                    ))
                }
            </motion.div>


            {/* workflow */}
            <div className="w-full min-h-[50vh] flex flex-col items-center justify-center px-6 py-6 bg-white">
                {/* TOP CENTER CONTENT */}
                <div className="text-center max-w-2xl mb-14">
                    <span className="text-red-600 font-bold text-lg">
                        Process
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold mt-3 whitespace-nowrap">
                        How It Works
                    </h1>


                    <span className="block text-gray-500 mt-4 text-lg">
                        Getting started is simple. Four easy steps to a fully furnished space.
                    </span>
                </div>
            </div>
            <motion.div 
                className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {work_flow.map((v, i) => (
                    <Workcard key={i} item={v} />
                ))}
            </motion.div>

            {/* footer */}
            <Footer />

        </div>

        </>
    );
}


// workflow
function Workcard({ item }) {

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="relative bg-white border border-gray-100 rounded-3xl p-8 shadow-md transition-all duration-300"
        >

            <img src={item.img} alt="step icon" className="w-18 h-18 mb-6 rounded-2xl object-cover" />
            <p className="text-5xl font-extrabold text-gray-300/70">{item.count}</p>
            <h2 className="text-xl font-bold mt-4">{item.title}</h2>
            <p className="text-gray-500 mt-3 leading-relaxed">{item.description}</p>

        </motion.div>
    )
}


// features
function Featurecard({ data }) {

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] p-6 rounded-xl border border-red-500/80 flex flex-col"
        >

            <img src={data.img} alt="logo" className="w-15 h-15 mb-4 rounded-2xl" />
            <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
            <p className="text-lg text-gray-600">{data.description}</p>

        </motion.div>
    )
}


// category
function Categorycard({ data }) {

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="relative w-[90%] sm:w-[45%] md:w-[30%] h-[35vh] overflow-hidden rounded-xl group cursor-pointer"
        >

            <a href="">
                <img src={data.img} alt="Flexible Plans" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </a>

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold ">{data.title}</h2>
            </div>

        </motion.div>
    )
}
