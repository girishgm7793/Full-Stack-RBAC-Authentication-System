package com.auth.rbac.mapper;

import com.auth.rbac.dto.RegisterRequest;
import com.auth.rbac.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toUser(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // password and roles are set manually in AuthService
        return user;
    }
}
