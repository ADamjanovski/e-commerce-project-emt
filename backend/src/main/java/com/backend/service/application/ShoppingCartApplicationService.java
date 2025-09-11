package com.backend.service.application;

import com.backend.dto.DisplayProductDto;
import com.backend.dto.ShoppingCartDto;

import java.util.List;
import java.util.Optional;

public interface ShoppingCartApplicationService {

    List<DisplayProductDto> listAllProductsInShoppingCart(Long cartId);

    Optional<ShoppingCartDto> getActiveShoppingCart(String username);

    Optional<ShoppingCartDto> addProductToShoppingCart(String username, Long productId);

    Optional<ShoppingCartDto> removeProductToShoppingCart(String username, Long productId);

    Optional<ShoppingCartDto> checkout(Long id,String username);

    List<ShoppingCartDto> pastCarts(String username);

    Optional<ShoppingCartDto> getShoppingCartById(Long id);

}
