"use strict";
// ===============================
// :white_check_mark: SOLUTION: PRODUCT CLASS
// ===============================
// :white_check_mark: STEP 1: Custom ValidationError
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
// :white_check_mark: STEP 2: Product class
class Product {
    #price; // private field
    constructor(name, price, manufacturedDate) {
        Product.validateName(name);
        this.name = name;
        this.price = price; // use setter
        this.manufacturedDate = manufacturedDate;
    }
    // getter & setter for price
    get price() {
        return this.#price;
    }
    set price(value) {
        if (value < 0) throw new ValidationError("Price cannot be negative");
        this.#price = value;
    }
    getInfo() {
        return `${this.name} costs $${this.#price}`;
    }
    applyDiscount(percent) {
        const discount = Math.floor((this.#price * percent) / 100);
        this.#price -= discount;
    }
    getAge() {
        const days = Math.floor(
            (Date.now() - this.manufacturedDate) / (1000 * 60 * 60 * 24)
        );
        return days;
    }
    static validateName(name) {
        if (!name || name.length < 2) {
            throw new ValidationError("Name must be at least 2 characters");
        }
    }
}
// :white_check_mark: STEP 3: Subclasses
class LandProduct extends Product {
    getInfo() {
        return `[Land] ${this.name} costs $${this.price}`;
    }
}
class SeaProduct extends Product {
    getInfo() {
        return `[Sea] ${this.name} costs $${this.price}`;
    }
}
// :white_check_mark: BONUS: DigitalProduct subclass
class DigitalProduct extends Product {
    getInfo() {
        return `[Digital] ${this.name} costs $${this.price}`;
    }
    getAge() {
        console.log("Not applicable for digital products.");
        return null;
    }
}
// ===============================
// :white_check_mark: TESTING
// ===============================
try {
    console.log("=== LandProduct ===");
    const apple = new LandProduct("Apple", 100, new Date(2025, 6, 1));
    console.log(apple.getInfo()); // [Land] Apple costs $100
    apple.applyDiscount(10);
    console.log(apple.getInfo()); // [Land] Apple costs $90
    console.log("Days old:", apple.getAge());
    console.log("\n=== SeaProduct ===");
    const tuna = new SeaProduct("Tuna", 200, new Date(2025, 6, 10));
    console.log(tuna.getInfo()); // [Sea] Tuna costs $200
    tuna.applyDiscount(5);
    console.log(tuna.getInfo()); // [Sea] Tuna costs $190
    console.log("\n=== DigitalProduct (BONUS) ===");
    const ebook = new DigitalProduct("E-Book", 50, new Date(2025, 2, 1));
    console.log(ebook.getInfo()); // [Digital] E-Book costs $50
    ebook.applyDiscount(20);
    console.log(ebook.getInfo()); // [Digital] E-Book costs $40
    ebook.getAge(); // logs "Not applicable for digital products."
    console.log("\n=== ValidationError test ===");
    // Uncomment to test:
    // Product.validateName(""); // should throw ValidationError
} catch (err) {
    if (err instanceof ValidationError) {
        console.error("Validation failed:", err.message);
    } else {
        console.error("Error:", err.message);
    }
}










