package com.backend.dto;

import com.backend.model.domain.Category;

public record CreateCategoryDto(String name, String description) {

    public Category toCategory() {
        return new Category(name, description);
    }
}
