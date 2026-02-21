package com.espalhai.controller;

import com.espalhai.model.Category;
import com.espalhai.model.User;
import com.espalhai.repository.CategoryRepository;
import com.espalhai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public User getUserPublicProfile(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        // Limpa dados sensíveis
        return User.builder()
                .id(user.getId())
                .nome(user.getNome())
                .email(user.getEmail())
                .telefone(user.getTelefone())
                .cidade(user.getCidade())
                .estado(user.getEstado())
                .fotoBase64(user.getFotoBase64())
                .role(user.getRole())
                .dataCadastro(user.getDataCadastro())
                .build();
    }
}
