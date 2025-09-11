package com.backend.service.application.impl;

import com.backend.dto.DisplayProductDto;
import com.backend.dto.ShoppingCartDto;
import com.backend.service.application.ShoppingCartApplicationService;
import com.backend.service.domain.ShoppingCartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartApplicationServiceImpl implements ShoppingCartApplicationService {

    private final ShoppingCartService shoppingCartService;

    public ShoppingCartApplicationServiceImpl(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @Override
    public List<DisplayProductDto> listAllProductsInShoppingCart(Long cartId) {
        return DisplayProductDto.from(shoppingCartService.listAllProductsInShoppingCart(cartId));
    }

    @Override
    public Optional<ShoppingCartDto> getActiveShoppingCart(String username) {
        return shoppingCartService.getActiveShoppingCart(username).map(ShoppingCartDto::from);
    }

    @Override
    public Optional<ShoppingCartDto> addProductToShoppingCart(String username, Long productId) {
        return shoppingCartService.addProductToShoppingCart(username, productId).map(ShoppingCartDto::from);
    }

    @Override
    public Optional<ShoppingCartDto> removeProductToShoppingCart(String username, Long productId) {
        return shoppingCartService.removeProductToShoppingCart(username, productId).map(ShoppingCartDto::from);
    }

    @Override
    public Optional<ShoppingCartDto> checkout(Long id,String username) {
        return shoppingCartService.checkout(id, username).map(ShoppingCartDto::from);
    }

    @Override
    public List<ShoppingCartDto> pastCarts(String username) {
        return ShoppingCartDto.from(shoppingCartService.pastCarts(username));
    }

    @Override
    public Optional<ShoppingCartDto> getShoppingCartById(Long id) {
        return shoppingCartService.getShoppingCartById(id).map(ShoppingCartDto::from);
    }
}

