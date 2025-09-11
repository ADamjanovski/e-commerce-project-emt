package com.backend.service.application;

import com.backend.dto.CreateProductDto;
import com.backend.dto.DisplayProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductApplicationService {

    Optional<DisplayProductDto> update(Long id, CreateProductDto productDto) ;

    Optional<DisplayProductDto> save(CreateProductDto productDto);

    Optional<DisplayProductDto> findById(Long id);

    List<DisplayProductDto> findAll();
    Page<DisplayProductDto> findAll(Pageable pageable);

    void deleteById(Long id);

    Page<DisplayProductDto> findByCategory(Pageable pageable,Long categoryId);

    List<DisplayProductDto> getRecommendedProducts(String username);
}
