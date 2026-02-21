package com.espalhai.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User remetente;

    @ManyToOne
    @JoinColumn(name = "recipient_id", nullable = false)
    private User destinatario;

    @Column(columnDefinition = "TEXT")
    private String conteudo;

    @Column(columnDefinition = "LONGTEXT")
    private String anexoBase64;

    private String anexoNome;
    private String anexoTipo; // image/png, application/pdf, etc.

    private LocalDateTime timestamp = LocalDateTime.now();

    private boolean lida = false;
}
