import { ProductRepository } from "../repositories/product.repository";
import { MenuRepository } from "../repositories/menu.repository";

const productRepo = new ProductRepository();
const menuRepo = new MenuRepository();

export async function warmupCache() {
    console.log("🔥 Starting cache warmup...");

    try {
    // Warmup products page 1 (most accessed)
    await productRepo.getProduct(1, 10);
    console.log("✅ Products page 1 cached");

    // Warmup products count
    await productRepo.countProducts();
    console.log("✅ Products count cached");

    // Warmup menus
    await menuRepo.getAllMenus();
    console.log("✅ Menus cached");

    console.log("🎉 Cache warmup completed!");
    } catch (error) {
    console.error("❌ Cache warmup failed:", error);
    }
}
