import { useState } from 'react';
import Footer from './Footer';
import { storage, db } from '../Firebase/setup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = () => {
    const [productTitle, setProductTitle] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number | string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageURL = '';
            if (image) {
                const imageRef = ref(storage, `products/${uuidv4()}`);
                const uploadSnapshot = await uploadBytes(imageRef, image);
                imageURL = await getDownloadURL(uploadSnapshot.ref);
                console.log('Image URL:', imageURL);
            }

            const productCollectionRef = collection(db, 'products');
            await addDoc(productCollectionRef, {
                productTitle,
                productPrice: Number(productPrice),
                category,
                description,
                imageURL,
            });
            console.log('Product added successfully!');
            setProductTitle('');
            setProductPrice('');
            setCategory('');
            setDescription('');
            setImage(null);

        } catch (error) {
            console.error('Error storing product in Firestore:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const fileType = file.type.split('/')[0];
            if (fileType === 'image') {
                setImage(file);
            } else {
                alert('Please upload a valid image file');
            }
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
                    <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="title">Product Title</label>
                            <input type="text" id="title" className="w-full p-2 border border-gray-300 rounded"
                                value={productTitle} onChange={(e) => setProductTitle(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="price">Price</label>
                            <input type="number" id="price" className="w-full p-2 border border-gray-300 rounded"
                                value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="category">Category</label>
                            <input type="text" id="category" className="w-full p-2 border border-gray-300 rounded"
                                value={category} onChange={(e) => setCategory(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="description">Description</label>
                            <textarea id="description" className="w-full p-2 border border-gray-300 rounded"
                                value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="image">Product Image</label>
                            <input type="file" id="image" accept="image/*" className="w-full p-2 border border-gray-300 rounded" onChange={handleImageChange} />
                        </div>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading} >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddProduct;
