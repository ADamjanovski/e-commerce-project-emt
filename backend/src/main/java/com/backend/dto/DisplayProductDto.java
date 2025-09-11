package com.backend.dto;

import com.backend.model.domain.Category;
import com.backend.model.domain.Product;

import java.util.List;
import java.util.stream.Collectors;

public record DisplayProductDto(
        Long id,
        String name,
        Double price,
        String imageUrl,

        List<String> characteristics,
        Category category
) {

    public static DisplayProductDto from(Product product) {
        return new DisplayProductDto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCharacteristics(),
                product.getCategory()
        );
    }

    public static List<DisplayProductDto> from(List<Product> products) {
        return products.stream().map(DisplayProductDto::from).collect(Collectors.toList());
    }

    public Product toProduct(Category category) {
        return new Product(name,price, imageUrl, characteristics, category);
    }
}
