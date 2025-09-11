package com.backend.web.controller;

import com.backend.dto.CreateProductDto;
import com.backend.dto.DisplayProductDto;
import com.backend.service.application.ProductApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Product API", description = "Endpoints for managing products")
public class ProductController {

    private final ProductApplicationService productApplicationService;

    public ProductController(ProductApplicationService productApplicationService) {
        this.productApplicationService = productApplicationService;
    }

    @Operation(summary = "Get all products", description = "Retrieves a list of all available products.")
    @GetMapping
    public List<DisplayProductDto> findAll() {
        return productApplicationService.findAll();
    }

    @Operation(summary = "Get recommended products", description = "Retrieves a list of recommended available products.")
    @GetMapping("/recommended")
    public List<DisplayProductDto> findRecommended(Authentication authentication) {
        return productApplicationService.findAll();
    }

    @Operation(summary = "Get products by category", description = "Retrieves a list of  products by category.")
    @GetMapping("/by-category/{id}")
    public ResponseEntity<Page<DisplayProductDto>> findProductsByCategory(@PathVariable Long id, Pageable pageable) {
        return ResponseEntity.ok(productApplicationService.findByCategory(pageable, id));
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<DisplayProductDto>> findAll(Pageable pageable) {
        return ResponseEntity.ok(productApplicationService.findAll(pageable));
    }

    @Operation(summary = "Get product by ID", description = "Finds a product by its ID.")
    @GetMapping("/{id}")
    public ResponseEntity<DisplayProductDto> findById(@PathVariable Long id) {
        return productApplicationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
            summary = "Add a new product",
            description = "Creates a new product based on the given ProductDto."
    )
    @PostMapping("/add")
    public ResponseEntity<DisplayProductDto> save(@RequestBody CreateProductDto createProductDto) {
        return productApplicationService.save(createProductDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // todo: refactor product update functionality
    @Operation(
            summary = "Update an existing product", description = "Updates a product by ID using ProductDto."
    )
    @PutMapping("/edit/{id}")
    public ResponseEntity<DisplayProductDto> update(
            @PathVariable Long id,
            @RequestBody CreateProductDto product
    ) {
        return productApplicationService.update(id, product)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete a product", description = "Deletes a product by its ID.")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (productApplicationService.findById(id).isPresent()) {
            productApplicationService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}