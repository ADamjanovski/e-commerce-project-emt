package com.backend.service.application;


import com.backend.dto.CreateCategoryDto;
import com.backend.dto.DisplayCategoryDto;

import java.util.List;
import java.util.Optional;

public interface CategoryApplicationService {

    List<DisplayCategoryDto> findAll();

    Optional<DisplayCategoryDto> findById(Long id);

    Optional<DisplayCategoryDto> update(Long id, CreateCategoryDto category);

    void deleteById(Long id);

    Optional<DisplayCategoryDto> save(CreateCategoryDto createCategoryDto);
}

