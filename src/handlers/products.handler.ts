import { ProductRepository } from "../repositories/product.repository";

const productRepo = new ProductRepository();

export const productHandlers = {
    async getAllProducts() {
        try {
            const products = await productRepo.getProduct();
            return {
                success: true,
                data: products,
            };
        } catch (error) {
            return {
                success: false,
                error: "Failed to fetch products",
                message: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
}