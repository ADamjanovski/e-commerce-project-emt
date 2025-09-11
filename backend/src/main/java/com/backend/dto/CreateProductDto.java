package com.backend.dto;

import com.backend.model.domain.Category;
import com.backend.model.domain.Product;

import java.util.List;

public record CreateProductDto(
        String name,

        Double price,

        String imageUrl,

        List<String> characteristics,

        Long categoryId
) {

    public Product toProduct(Category category) {
        return new Product(name,price, imageUrl, characteristics, category);
    }

}