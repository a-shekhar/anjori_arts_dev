package com.anjoriarts.service.user;

import com.anjoriarts.common.Consonants;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        Optional<UserEntity> fetchedUser = this.userRepository.findByEmail(identifier);
        if(fetchedUser.isEmpty()){
            throw new UsernameNotFoundException("Invalid Credentials!!!");
        }

        UserEntity user = fetchedUser.get();
        logger.info("Fetched user ID is" + user.getUserId());

        List<GrantedAuthority> roles = new ArrayList<>(List.of(
                new SimpleGrantedAuthority(Consonants.USER_ROLE)
        ));

        if(user.getRole().equals(Consonants.ADMIN_ROLE)){
            roles.add(new SimpleGrantedAuthority(Consonants.ADMIN_ROLE));
        }

        return new User(
                user.getEmail(),
                user.getPassword(),
                roles
        );
    }
}
