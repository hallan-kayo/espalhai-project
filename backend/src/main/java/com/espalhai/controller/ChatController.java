package com.espalhai.controller;

import com.espalhai.model.Message;
import com.espalhai.model.User;
import com.espalhai.repository.MessageRepository;
import com.espalhai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @MessageMapping("/chat")
    public void processMessage(@Payload Message message) {
        message.setTimestamp(LocalDateTime.now());
        Message saved = messageRepository.save(message);
        
        // Envia para o destinatário específico
        messagingTemplate.convertAndSendToUser(
            String.valueOf(message.getDestinatario().getId()), 
            "/queue/messages", 
            saved
        );
    }

    @GetMapping("/api/chat/history/{u1Id}/{u2Id}")
    @ResponseBody
    public List<Message> getChatHistory(@PathVariable Long u1Id, @PathVariable Long u2Id) {
        User u1 = userRepository.findById(u1Id).orElseThrow();
        User u2 = userRepository.findById(u2Id).orElseThrow();
        return messageRepository.findChatHistory(u1, u2);
    }
}
