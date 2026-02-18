package com.espalhai.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reporter_id", nullable = false)
    private User denunciante;

    @ManyToOne
    @JoinColumn(name = "ad_id", nullable = false)
    private Ad anuncio;

    @Column(nullable = false)
    private String motivo;

    private LocalDateTime data = LocalDateTime.now();

    private String status = "PENDENTE"; // PENDENTE, PROCESSADA
}
