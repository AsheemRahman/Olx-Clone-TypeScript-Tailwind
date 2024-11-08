import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const Details = () => {
    const location = useLocation();
    const data = location.state?.data;

    return (
        <>
            <h1 className="font-bold text-7xl m-10 text-center">
                Product Detail Page
            </h1>
            <div className="flex p-4">
                <img src={data.image} alt={data.title} className="w-2/3  mr-10" />
                <div>
                    <h1 className="font-bold text-3xl"> $ {data.price}</h1>
                    <h1 className="mt-5"> <span className="font-semibold">Category</span> : {data.category}</h1>
                    <h1 className="mt-5"> <span className="font-semibold">Title</span> : {data.title}</h1>
                    <h1 className="mt-5"> <span className="font-semibold">Description</span> : {data.description}</h1>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Details;
