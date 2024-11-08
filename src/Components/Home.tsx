import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './main';
import Photo from '../assets/phone-app.webp'
import appStore from '../assets/appstore_2x.webp'
import playStore from '../assets/playstore_2x.webp'

const Home = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error("Home must be used within a Context.Provider");
    }

    const { prod: products, search, menu } = context;

    return (
        <>
            <div className="grid grid-cols-4">
                {products?.filter((data: any) => data?.title?.includes(search || menu)).map((data: any, index: number) => (
                    <Link to="/details" state={{ data }} key={index}>
                        <div className="border border-spacing-1 p-2 ml-3 mt-3">
                            <img src={data?.image} alt={data?.title} className="w-60 h-48" />
                            <h1 className="font-bold text-xl">${data?.price}</h1>
                            <h1>{data?.title}</h1>
                            <h1>{data?.category}</h1>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex m-10 '>
                <img src={Photo} className='m-10 ' />
                <div className='flex flex-col justify-center w-96 ml-10 mr-10'>
                    <h1 className='font-bold text-5xl w-96 '>Try the olx app</h1>
                    <p className='w-96 mt-6'>Buy, sell and find just about anything using the app on your mobile.</p>
                </div>
                <div className='w-56 flex flex-col justify-center ml-10 '>
                    <h1 className='w-52 mb-5 font-bold'>Get your app today</h1>
                    <div className='flex flex-row '>
                        <img className='w-32' src={appStore} alt="" />
                        <img className='w-32 ml-5' src={playStore} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home