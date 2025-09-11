package com.backend.service.application.impl;

import com.backend.dto.CreateProductDto;
import com.backend.dto.DisplayProductDto;
import com.backend.model.domain.Category;
import com.backend.service.application.ProductApplicationService;
import com.backend.service.domain.CategoryService;
import com.backend.service.domain.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductApplicationServiceImpl implements ProductApplicationService {

    private final ProductService productService;
    private final CategoryService categoryService;

    public ProductApplicationServiceImpl(
            ProductService productService,
            CategoryService categoryService
    ) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @Override
    public Optional<DisplayProductDto> update(Long id, CreateProductDto productDto) {
        Optional<Category> category = categoryService.findById(productDto.categoryId());

        return productService.update(id,
                        productDto.toProduct(
                                category.orElse(null)
                        )
                )
                .map(DisplayProductDto::from);

    }

    @Override
    public Optional<DisplayProductDto> save(CreateProductDto productDto) {
            Optional<Category> category = categoryService.findById(productDto.categoryId());

        return category.flatMap(value -> productService.save(productDto.toProduct(value))
                .map(DisplayProductDto::from));
    }


    @Override
    public Optional<DisplayProductDto> findById(Long id) {
        return productService.findById(id).map(DisplayProductDto::from);
    }

    @Override
    public List<DisplayProductDto> findAll() {
        return productService.findAll().stream().map(DisplayProductDto::from).toList();
    }

    @Override
    public Page<DisplayProductDto> findAll(Pageable pageable) {
        return productService.findAll(pageable)
                .map(DisplayProductDto::from);
    }

    @Override
    public void deleteById(Long id) {
        productService.deleteById(id);
    }

    @Override
    public Page<DisplayProductDto> findByCategory(Pageable pageable, Long categoryId) {
        return productService.findByCategory(pageable,categoryId)
                .map(DisplayProductDto::from);
    }

    @Override
    public List<DisplayProductDto> getRecommendedProducts(String username) {
        return productService.getRecommendedProducts(username).stream().map(DisplayProductDto::from).toList();
    }
}