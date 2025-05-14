package com.anjoriarts.service.user;

import com.anjoriarts.dto.UserDTO;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private  final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO convertUserDetailsToDto(UserDetails userDetails) {
        Optional<UserEntity> fetchedUser = userRepository.findByEmail(userDetails.getUsername());
        if(fetchedUser.isEmpty()){
            throw new UsernameNotFoundException("Invalid credentials");
        }
        UserEntity user = fetchedUser.get();
        return UserDTO.builder()
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .countryCode(user.getCountryCode())
                .phoneNo(user.getPhoneNo())
                .password(user.getPassword())
                .publicImageUrl(user.getProfileImageUrl())
                .build();
    }
}
