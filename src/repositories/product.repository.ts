import { db } from "../db";
import { products, shops } from "../db/schema";
import { asc, eq, count } from "drizzle-orm";
import { getCache, setCache, deleteCache } from "../redis";

const CACHE_TTL = 300;

export class ProductRepository {
    async getProduct(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const cacheKey = `products:page:${page}:limit:${limit}`;

    try {
        const cached = await getCache(cacheKey);
        if (cached) {
            console.log(`Cache hit: products page ${page}`);
            return cached;
        }
            console.log(`Cache miss: products page ${page}`);
        } catch (error) {
            console.warn("Cache gagal, fallback ke database:", error);
    }

    const query = db
    .select({
        id: products.id,
        title: products.title,
        jenis: products.jenis,
        image: products.image,
        price: products.price,
        rating: products.rating,
        ratingCount: products.rating_count,
        sold: products.sold,
        isMall: products.is_mall,
        isOri: products.is_ori,
        isFavorite: products.is_favorite,
        coin: products.coin,
        diskon: products.diskon,
        category: products.category,
        description: products.description,
        shipping: products.shipping,
        promo: products.promo,
        createdAt: products.created_at,
        kota: products.kota,
        durasi: products.durasi,
        ShopID: products.shop_id,
        isTrending: products.is_trending,
        ImageUrl: products.image_url,
        badge: products.badge,
        live: products.live,
        status: products.status,
        // Shop details
        shopName: shops.name,
        shopRating: shops.rating,
        shopProductCount: shops.product_count,
        shopChatPercentage: shops.chat_percentage,
        shopLocation: shops.location,
    })
    .from(products)
    .innerJoin(shops, eq(products.shop_id, shops.id))
    .orderBy(asc(products.created_at))
    .limit(limit)
    .offset(offset);

    const result = await query;

    const transformedData = result.map((row) => ({
        id: row.id,
        title: row.title,
        price: row.price,
        rating: row.rating,
        ratingCount: row.ratingCount,
        sold: row.sold,
        image: row.image,
        ImageUrl: row.ImageUrl,
        isMall: row.isMall,
        isOri: row.isOri,
        isTrending: row.isTrending,
        isFavorite: row.isFavorite,
        coin: row.coin,
        status: row.status,
        diskon: row.diskon,
        category: row.category,
        description: row.description,
        shipping: row.shipping,
        promo: row.promo,
        createdAt: row.createdAt,
        kota: row.kota,
        durasi: row.durasi,
        ShopID: row.ShopID,
        shopDetail: {
        name: row.shopName,
        rating: row.shopRating,
        productCount: row.shopProductCount,
        chatPercentage: row.shopChatPercentage,
        location: row.shopLocation,
        },
    }));

    await setCache(cacheKey, transformedData, CACHE_TTL);
    return transformedData;
    }

    async countProducts(): Promise<number> {
    const cacheKey = "products:count";

    try {
        const cached = await getCache(cacheKey);
        if (cached) {
        return Number(cached);
        }
    } catch (error) {
        console.warn("Cache gagal, fallback ke database:", error);
    }
    const result = await db.select({ count: count() }).from(products);
    const total = Number(result[0].count);
    await setCache(cacheKey, total, CACHE_TTL);

    return total;
    }

    async invalidateProductCache(): Promise<void> {
    await deleteCache("products:count");
        console.log("🗑️ Product cache invalidated");
    }
}