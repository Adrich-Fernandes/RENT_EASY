import { Search, CalendarDays, Truck, Smile, PiggyBank, Clock, Wrench, ShieldCheck, RotateCcw } from 'lucide-react';

// how it works cards data
export const work_flow = [
    {
        icon: Search,
        count: "01",
        title: "Browse & Select",
        description: "Explore our wide range of furniture and appliances. Filter by category, price, or tenure."
    },
    {
        icon: CalendarDays,
        count: "02",
        title: "Choose Your Plan",
        description: "Select your preferred rental tenure - 3, 6, or 12 months. Add to cart and checkout."
    },
    {
        icon: Truck,
        count: "03",
        title: "Schedule Delivery",
        description: "Pick a convenient delivery date. We'll deliver, install, and set everything up."
    },
    {
        icon: Smile,
        count: "04",
        title: "Enjoy & Relax",
        description: "Use your rentals worry-free. Extend, swap, or return when your plan ends."
    }
];

// fecilities card data 
export const Features = [
    {
        icon: PiggyBank,
        title: "No Heavy Upfront Costs",
        description: "Pay monthly rent instead of large purchases. Keep your savings intact."
    },
    {
        icon: Clock,
        title: "Flexible Tenure Plans",
        description: "Choose 3, 6, or 12-month plans. Extend or return anytime."
    },
    {
        icon: Truck,
        title: "Free Delivery & Pickup",
        description: "We handle all logistics. Free delivery, installation, and pickup."
    },
    {
        icon: Wrench,
        title: "Free Maintenance",
        description: "Something broken? We fix or replace it at no extra cost."
    },
    {
        icon: ShieldCheck,
        title: "Quality Assured",
        description: "Premium products, thoroughly cleaned and inspected."
    },
    {
        icon: RotateCcw,
        title: "Quick Return",
        description: "No hidden charges. Return anytime with flexible terms."
    }
];

// category data
export const Category = [
    {
        img: "https://www.orangetree.in/cdn/shop/files/Gallery-1ChiyoL-ShapedSofaBuyOnline.jpg?v=1722852692",
        title: "Sofa",
    },
    {
        img: "https://img.freepik.com/free-photo/washing-machine-minimal-laundry-room-interior-design_53876-145501.jpg?semt=ais_hybrid&w=740&q=80",
        title: "Washing Machine",
    },
    {
        img: "https://media.istockphoto.com/id/1094166778/photo/close-up-of-an-open-refrigerator.jpg?s=612x612&w=0&k=20&c=5Z6xs_Z25xyDBEg4HYxXf87M3N4vj6a5raxA7kET-Rw=",
        title: "Fridge",
    },
    {
        img: "https://cdn.neowin.com/news/images/uploaded/2024/01/1705695583_untitled_design.jpg",
        title: "Television(TV)",
    },
    {
        img: "https://www.shopsleepology.com/cdn/shop/articles/Platform_bed_with_mattress_from_Sleepology_699c1c4a-11ef-499f-8a75-e64ee219a875.jpg?v=1750082108&width=1100",
        title: "Bed and Mattres",
    },
    {
        img: "https://allcollectivenouns.com/wp-content/uploads/2024/12/33-17.jpg",
        title: "Table and Chair",
    }
];


// products card data
export const productsCard = [
    {
        img: "https://www.orangetree.in/cdn/shop/files/Gallery-1ChiyoL-ShapedSofaBuyOnline.jpg?v=1722852692",
        title: "luxury sofa",
        discription: "3-seat sofa fabric type : leather",
        price: "₹2,999/mo",
        deposit: "₹5,997",

    },
    {
        img: "https://cdn.prod.website-files.com/5f2b10811da7064399ed3a1c/61ac6377b6963b12b0b36475_1st-Venus1920x1000.webp",
        title: "sofa-seater",
        discription: "Premium quality fabric sofa with comfortable cushioning. Perfect for living rooms.",
        price: "₹1,999/mo",
        deposit: "₹5,997",
    },
    {
        img: "https://casagold.in/cdn/shop/products/Coastal_Chic_Blue_Luxury_Sofa.jpg?v=1735904752&width=1500",
        title: "blue sofa",
        discription: "",
        price: "₹2,999/mo",
        deposit: "₹5,997",
    },
    {
        img: "https://furnishio.in/cdn/shop/files/chime-3-2-1-sofa-set-269_1000x604.webp?v=1728060370",
        title: "sofa set",
        discription: "",
        price: "₹2,999/mo",
        deposit: "₹5,997",
    },
    {
        img: "https://pelicanessentials.com/cdn/shop/files/3seatersofa_1_08d9b16d-6aa7-40b4-b2d3-1a45e417ca6e.jpg?v=1751593289&width=2048",
        title: "soft sofa",
        discription: "",
        price: "₹3,999/mo",
        deposit: "₹7,997",
    },
    {
        img: "https://media.architecturaldigest.com/photos/64de634d02916e5d018e0c81/2:1/w_1280%2Cc_limit/AD1022_BERKUS_BRENT_7.jpg",
        title: "leather sofa",
        discription: "",
        price: "₹2,999/mo",
        deposit: "₹6,997",
    }
]


// rents request recived in admin panal
export const adminTableRents = [
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        title: " Sofa",
        category: "Furniture",
        rent: "₹1,000/mo",
        deposit: "₹5,000"
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        title: "Modern Sofa",
        category: "Furniture",
        rent: "₹1,000/mo",
        deposit: "₹5,000"
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        title: " Sofa",
        category: "Furniture",
        rent: "₹1,000/mo",
        deposit: "₹5,000"
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        title: " Sofa",
        category: "Furniture",
        rent: "₹1,000/mo",
        deposit: "₹5,000"
    },
]




// admin panal customer request (order)
export const CustomerRequest = [
    {
        name: "Neil Sims",
        email: "neil.sims@flowbite.com",
        product: "MacBook Pro",
        tenure: "6 Months",
        total: "$2400",
        status: "Active",
        orderdate:"27/02/2026"
    },
    {
        name: "Bonnie red",
        email: "bonnie@flowbite.com",
        product: "iPhone 15",
        tenure: "3 Months",
        total: "$900",
        status: "Pending",
    },
    {
        name: "Jese Leos",
        email: "jese@flowbite.com",
        product: "iPad Air",
        tenure: "12 Months",
        total: "$1800",
        status: "Completed",
    },
    {
        name: "Jese Leos",
        email: "jese@flowbite.com",
        product: "iPad Air",
        tenure: "12 Months",
        total: "$1800",
        status: "Completed",
    },


];




// maintainence request
export const maintain = [
    {
        name: "Jese Leos",
        email: "jese@flowbite.com",
        product: "iPad Air",
        issue: "broken",
        status: "Completed",
    },
    {
        name: "Jese Leos",
        email: "jese@flowbite.com",
        product: "iPad Air",
        issue: "broken",
        status: "Completed",
    },
    {
        name: "Jese Leos",
        email: "jese@flowbite.com",
        product: "iPad Air",
        issue: "broken",
        status: "Completed",
    },

];





// category Furniture
export const CategoryFurniture = [
    {
        name: "sofa"
    },
    {
        name: "chair"
    },
    {
        name: "table"
    },
    {
        name: "wordrobe"
    },
    {
        name: "bookshelf"
    },
    {
        name: "bed"
    },
];




// rentals card
export const RentCard = [
    {
        img: "https://images.woodenstreet.de/image/cache/data/fabric-sofa/adrick-3-seater-sofa/product/jade-ivory/103-810x702.jpg",
        title: "Luxury Sofa",
        duration: "3 months",
        address: "123 Main St, Apt 4B, Springfield, IL 62704",
        endDate: "ends in 12.10.2026",
        price: "./1000"
    },
    {
        img: "https://images.woodenstreet.de/image/cache/data/fabric-sofa/adrick-3-seater-sofa/product/jade-ivory/103-810x702.jpg",
        title: "Luxury Sofa",
        duration: "3 months",
        address: "123 Main St, Apt 4B, Springfield, IL 62704",
        endDate: "ends in 12.10.2026",
        price: "./1000"
    },
    {
        img: "https://images.woodenstreet.de/image/cache/data/fabric-sofa/adrick-3-seater-sofa/product/jade-ivory/103-810x702.jpg",
        title: "Luxury Sofa",
        duration: "3 months",
        address: "123 Main St, Apt 4B, Springfield, IL 62704",
        endDate: "ends in 12.10.2026",
        price: "./1000"
    },
    {
        img: "https://images.woodenstreet.de/image/cache/data/fabric-sofa/adrick-3-seater-sofa/product/jade-ivory/103-810x702.jpg",
        title: "Luxury Sofa",
        duration: "3 months",
        address: "123 Main St, Apt 4B, Springfield, IL 62704",
        endDate: "ends in 12.10.2026",
        price: "./1000"
    }
];


export const Total = [
    {
        name: "sofa",
        price: 2000,
        security: 4000
    },
    {
        name: "chair",
        price: 1000,
        security: 2000
    },
    {
        name: "table",
        price: 900,
        security: 2000
    },
    {
        name: "wordrobe",
        price: 1100,
        security: 2000
    },
    {
        name: "bookshelf",
        price: 900,
        security: 2000
    },
    {
        name: "bed",
        price: 800,
        security: 1500
    },
];






export const CartCard = [
    {
        img: "https://ea-unboxed-assets.croma.com/cromaunboxed-as/2024/01/LG.png",
        title: " LG 260L Double Door Refrigerator",
        description: " Premium cooling solution for your home.",
        price: 2000,
        deposity: 5000

    },
    {
        img: "https://www.lg.com/content/dam/channel/wcms/in/2025_ms_lg-com/tv/microsite/buying-guide/gp1/features/mobile/microsite-buying-guide-2025-ai-tv-01-feature-kv-m.jpg",
        title: " Samsung 43-Inch Smart TV",
        description: " Class Crystal UHD U8000F 4K Smart TV (2025 Model) Endless Free Content, Crystal Processor 4K, MetalStream Design, Knox Security, Alexa Built-in",
        price: 4000,
        deposity: 8000

    },
];







export const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    title: "Minimal Arc Timepiece",
    price: "$249.00",
    description: "Sleek stainless-steel case with sapphire crystal face. Water-resistant up to 50m. Only 14 units left.",
    status: "OUT FOR DELIVERY",
    statusColor: "bg-red-100 text-red-700",
    bg: "bg-amber-50",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    title: "Aura Wireless Headphones",
    price: "$189.00",
    description: "40-hour battery, active noise cancellation, and premium 40mm drivers. Top-rated by 1,200+ buyers.",
    status: "ordered",
    statusColor: "bg-sky-100 text-sky-700",
    bg: "bg-sky-50",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
    title: "Verdure Signature Fragrance",
    price: "$95.00",
    description: "Limited run of 500 bottles. Notes of cedar, bergamot, and white musk. Arrives in a luxury gift box.",
    status: "ordered",
    statusColor: "bg-violet-100 text-violet-700",
    bg: "bg-red-50",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
    title: "Stride Air Running Shoes",
    price: "$79.00",
    description: "Breathable mesh upper with responsive foam sole. Sizes 6–12 available. Size 9 selling fast.",
    status: "ordered",
    statusColor: "bg-red-100 text-red-700",
    bg: "bg-rose-50",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    title: 'ProBook Ultra 14" Laptop',
    price: "$1,299.00",
    description: "Intel Core Ultra 7, 16GB RAM, 1TB SSD, OLED display. Ships April 1st — reserve yours now.",
    status: "dispatch",
    statusColor: "bg-orange-100 text-orange-700",
    bg: "bg-violet-50",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80",
    title: "Urban Canvas High-Top",
    price: "$115.00",
    description: "Vulcanized rubber sole, premium canvas upper. Trending this week — 340 carts and counting.",
    status: "complete",
    statusColor: "bg-red-100 text-red-700",
    bg: "bg-orange-50",
  },
];
