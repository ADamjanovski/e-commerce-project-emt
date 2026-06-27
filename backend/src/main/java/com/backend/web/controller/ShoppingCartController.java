package com.backend.web.controller;

import com.backend.dto.ShoppingCartDto;
import com.backend.model.domain.User;
import com.backend.service.application.ShoppingCartApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shopping-cart")
@Tag(name = "Shopping Cart API", description = "Endpoints for managing the shopping cart")
public class ShoppingCartController {

    private final ShoppingCartApplicationService shoppingCartApplicationService;

    public ShoppingCartController(ShoppingCartApplicationService shoppingCartApplicationService) {
        this.shoppingCartApplicationService = shoppingCartApplicationService;
    }

    @Operation(
            summary = "Get active shopping cart",
            description = "Retrieves the active shopping cart for the logged-in user"
    )

    @GetMapping
    public ResponseEntity<ShoppingCartDto> getActiveShoppingCart(@AuthenticationPrincipal User user) {
        String username = user.getUsername();
        return shoppingCartApplicationService.getActiveShoppingCart(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
            summary = "Add product to shopping cart",
            description = "Adds a product to the shopping cart for the logged-in user"
    )
    @PostMapping("/add-product/{id}")
    public ResponseEntity<ShoppingCartDto> addProductToShoppingCart(
            @PathVariable Long id,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            return shoppingCartApplicationService.addProductToShoppingCart(user.getUsername(), id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(
            summary = "Remove product from shopping cart",
            description = "Removes a product from the shopping cart for the logged-in user"
    )
    @PostMapping("/remove-product/{id}")
    public ResponseEntity<ShoppingCartDto> removeProductToShoppingCart(
            @PathVariable Long id,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            return shoppingCartApplicationService
                    .removeProductToShoppingCart(user.getUsername(), id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(
            summary = "Confirm checkout",
            description = "Confirms checkout for the logged-in user"
    )
    @PostMapping("/checkout/{id}")
    public ResponseEntity<ShoppingCartDto> checkout(
            @PathVariable Long id,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            return shoppingCartApplicationService.checkout(id, user.getUsername())
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/past-carts")
    public List<ShoppingCartDto> pastCarts(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return shoppingCartApplicationService.pastCarts(user.getUsername());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingCartDto> getShoppingCartById(@PathVariable Long id) {
        try {
            return shoppingCartApplicationService.getShoppingCartById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException exception) {
            return ResponseEntity.badRequest().build();
        }
    }
}
