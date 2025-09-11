package com.backend.dto;

import com.backend.model.domain.ShoppingCart;
import com.backend.model.domain.ShoppingCartItem;
import com.backend.model.enumaration.ShoppingCartStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record ShoppingCartDto(
        Long id,
        LocalDateTime dateCreated,
        DisplayUserDto user,
        List<ShoppingCartItemDto> items,
        ShoppingCartStatus status
) {

    public static ShoppingCartDto from(ShoppingCart shoppingCart) {
        return new ShoppingCartDto(
                shoppingCart.getId(),
                shoppingCart.getDateCreated(),
                DisplayUserDto.from(shoppingCart.getUser()),
                shoppingCart.getProducts().stream()
                        .map(ShoppingCartItemDto::from)
                        .collect(Collectors.toList()),
                shoppingCart.getStatus()
        );
    }
}
