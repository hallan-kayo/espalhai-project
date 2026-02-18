package com.espalhai.repository;

import com.espalhai.model.Favorite;
import com.espalhai.model.User;
import com.espalhai.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUsuario(User usuario);
    Optional<Favorite> findByUsuarioAndAnuncio(User usuario, Ad anuncio);
}
