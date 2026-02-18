package com.espalhai.service;

import com.espalhai.model.User;
import com.espalhai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(User user) {
        user.setSenha(passwordEncoder.encode(user.getSenha()));
        user.setRoles(Collections.singleton("ROLE_USER"));
        return userRepository.save(user);
    }

    public User update(Long id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow();
        user.setNome(userDetails.getNome());
        user.setTelefone(userDetails.getTelefone());
        user.setFotoUrl(userDetails.getFotoUrl());
        user.setRua(userDetails.getRua());
        user.setNumero(userDetails.getNumero());
        user.setBairro(userDetails.getBairro());
        user.setCidade(userDetails.getCidade());
        user.setEstado(userDetails.getEstado());
        user.setComplemento(userDetails.getComplemento());
        
        if (userDetails.getSenha() != null && !userDetails.getSenha().isEmpty()) {
            user.setSenha(passwordEncoder.encode(userDetails.getSenha()));
        }
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User toggleStatus(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setAtivo(!user.isAtivo());
        return userRepository.save(user);
    }
}
