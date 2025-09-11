package com.backend.service.domain.impl;

import com.backend.model.domain.Product;
import com.backend.model.domain.ShoppingCart;
import com.backend.model.domain.ShoppingCartItem;
import com.backend.model.domain.User;
import com.backend.model.enumaration.ShoppingCartStatus;
import com.backend.model.exceptions.ProductNotFoundException;
import com.backend.model.exceptions.ProductNotInShoppingCart;
import com.backend.model.exceptions.ShoppingCartNotFoundException;
import com.backend.repository.ShoppingCartRepository;
import com.backend.service.domain.ProductService;
import com.backend.service.domain.ShoppingCartService;
import com.backend.service.domain.UserService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final UserService userService;
    private final ProductService productService;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository, UserService userService, ProductService productService) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.userService = userService;
        this.productService = productService;
    }


    @Override
    public List<Product> listAllProductsInShoppingCart(Long cartId) {
        if (shoppingCartRepository.findById(cartId).isEmpty())
            throw new ShoppingCartNotFoundException(cartId);


        return shoppingCartRepository
                .findById(cartId).get()
                .getProducts().stream().map(ShoppingCartItem::getProduct)
                .collect(Collectors.toList());

    }

    @Override
    public Optional<ShoppingCart> getActiveShoppingCart(String username) {
        User user = userService.findByUsername(username);

        return Optional.of(shoppingCartRepository.findByUserAndStatus(
                user,
                ShoppingCartStatus.CREATED
        ).orElseGet(() -> shoppingCartRepository.save(new ShoppingCart(user))));
    }

    @Override
    public Optional<ShoppingCart> addProductToShoppingCart(String username, Long productId) {
        return getActiveShoppingCart(username).map(cart -> {
            Product product = productService.findById(productId)
                    .orElseThrow(() -> new ProductNotFoundException(productId));

            cart.getProducts().stream()
                    .filter(i -> Objects.equals(i.getProduct().getId(), productId))
                    .findFirst()
                    .ifPresentOrElse(
                            item -> item.setQuantity(item.getQuantity() + 1),
                            () -> cart.addProduct(product, 1)
                    );

            return shoppingCartRepository.save(cart);
        });
    }

    @Override
    public Optional<ShoppingCart> removeProductToShoppingCart(String username, Long productId) {
        return getActiveShoppingCart(username).map(cart -> {
//            Product product = productService.findById(productId)
//                    .orElseThrow(() -> new ProductNotFoundException(productId));

            ShoppingCartItem item = cart.getProducts().stream()
                    .filter(i -> Objects.equals(i.getProduct().getId(), productId))
                    .findFirst()
                    .orElseThrow(() -> new ProductNotInShoppingCart(productId, username));

            if (item.getQuantity() > 1) {
                item.setQuantity(item.getQuantity() - 1);
            } else {
                cart.getProducts().remove(item);
            }

            return shoppingCartRepository.save(cart);
        });
    }

    @Override
    @CacheEvict(value = "recommendations", key = "#username")
    public Optional<ShoppingCart> checkout(Long id, String username) {
        if ( shoppingCartRepository.findById(id).isPresent()){
            ShoppingCart shoppingCart = shoppingCartRepository.findById(id).get();
            shoppingCart.setStatus(ShoppingCartStatus.FINISHED);
            return Optional.of(shoppingCartRepository.save(shoppingCart));
        }
        return Optional.empty();
    }

    @Override
    public List<ShoppingCart> pastCarts(String username) {
        User user = userService.findByUsername(username);

        return shoppingCartRepository.findAllByUserAndStatus(
                user,
                ShoppingCartStatus.FINISHED
        );
    }

    @Override
    public Optional<ShoppingCart> getShoppingCartById(Long id) {
        return shoppingCartRepository.findById(id);
    }

}
