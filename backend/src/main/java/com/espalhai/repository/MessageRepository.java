package com.espalhai.repository;

import com.espalhai.model.Message;
import com.espalhai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE (m.remetente = :u1 AND m.destinatario = :u2) OR (m.remetente = :u2 AND m.destinatario = :u1) ORDER BY m.timestamp ASC")
    List<Message> findChatHistory(User u1, User u2);
}
