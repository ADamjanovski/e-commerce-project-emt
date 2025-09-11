package com.backend.dto;

import com.backend.model.domain.ShoppingCartItem;

public record ShoppingCartItemDto(
        DisplayProductDto product,
        long quantity
) {
    public static ShoppingCartItemDto from(ShoppingCartItem item) {
        return new ShoppingCartItemDto(
                DisplayProductDto.from(item.getProduct()),
                item.getQuantity()
        );
    }
}

