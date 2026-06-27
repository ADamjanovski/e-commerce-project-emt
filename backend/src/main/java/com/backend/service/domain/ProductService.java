package com.backend.service.domain;

import com.backend.model.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Page<Product> findAll(Pageable pageable);

    Optional<Product> findById(Long id);

    Optional<Product> update(Long id, Product product);

    Optional<Product> save(Product product);

    void deleteById(Long id);

    List<Product> findAllIn(List<Long> productIds);

    Page<Product> findByCategory(Pageable pageable, Long categoryId);

    List<Product> getRecommendedProducts(String username);
}
