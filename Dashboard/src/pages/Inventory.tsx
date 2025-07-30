import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase-client'; 

interface Product {
  id: string;
  product: string;
  sku: string;
  stock: string;
  price: string;
  status: string;
  variants: string;
  marketplaces: {
    amazon?: boolean;
    flipkart?: boolean;
  };
  image?: string;
  createdAt: string;
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData: Product[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productsData.push({
            id: doc.id,
            product: data.product || '',
            sku: data.sku || '',
            stock: data.stock || '0',
            price: data.price || '0',
            status: data.status || 'Unknown',
            variants: data.variants || '0',
            marketplaces: data.marketplaces || {},
            image: data.image,
            createdAt: data.createdAt || new Date().toISOString()
          });
        });
    
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        const error = err as Error; // Type assertion
        console.error("Firebase Error Details:", error);
        setError(`Failed to load products: ${error.message}`);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getStatusClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'invoice': return 'bg-green-100 text-green-800';
      case 'low stock': return 'bg-yellow-100 text-yellow-800';
      case 'out of stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Product Inventory</h1>
      <p className="text-gray-600 mb-8">Manage your products, variants, and stock levels</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketplaces</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.image && (
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={`/uploads/${product.image}`} 
                          alt={product.product} 
                        />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.product}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.variants}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {product.marketplaces.amazon && (
                      <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">Amazon</span>
                    )}
                    {product.marketplaces.flipkart && (
                      <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">Flipkart</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;