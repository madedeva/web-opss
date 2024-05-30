
import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeCard from "@/app/components/WelcomeCard";

const prisma = new PrismaClient();

const getProducts = async () => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true
        },
    });
    return res;
};

const getBrans = async () => {
    const res = await prisma.brand.findMany();
    return res;
}

const Product = async () => {
    const [products, brands] = await Promise.all([getProducts(), getBrans()]);

    return (
        <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white rounded-lg overflow-hidden w-full mt-4">
            <div className="mb-2 px-4 py-4">
                <AddProduct brands={brands}/>
            </div>

            <table className="table mb-4">
                <thead className="text-sm text-black">
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.brand?.name}</td>
                            <td className="flex space-x-1">
                                <UpdateProduct product={product} brands={brands}/>
                                <DeleteProduct product={product}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </DashboardLayout>
    )
}

export default Product;