package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductStore productStore;
    
    public ProductController(ProductStore productStore) {
        this.productStore = productStore;
    }
    
    @GetMapping
    public List<Product> getProducts() {
        return productStore.findAll();
    }

    @PostMapping
    public Product createProduct(@RequestBody CreateProductRequest request) {
        return productStore.save(new Product(request.name()));
    }
}
