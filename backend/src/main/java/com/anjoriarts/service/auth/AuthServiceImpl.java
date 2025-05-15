package com.anjoriarts.service.auth;

import com.anjoriarts.dto.LoginDTO;
import com.anjoriarts.dto.SignupDTO;
import com.anjoriarts.dto.UserDTO;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.UserRepository;
import com.anjoriarts.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {


    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final UserService userService;

    public AuthServiceImpl(PasswordEncoder passwordEncoder , UserRepository userRepository,
                           AuthenticationManager authManager, UserService userService){
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authManager = authManager;
        this.userService = userService;
    }

    @Override
    @Transactional
    public SignupDTO saveUser(SignupDTO dto) {
        UserEntity user = new UserEntity();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhoneNo(dto.getPhoneNo());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        UserEntity savedUser = userRepository.save(user);
        logger.info("User created successfully...");
        SignupDTO savedUserDto = new SignupDTO(savedUser.getUserId(), savedUser.getFirstName(),
                savedUser.getLastName(), savedUser.getEmail(), savedUser.getPhoneNo(),
                savedUser.getUsername(), savedUser.getPassword(), null);
        return savedUserDto;
    }

    @Override
    public UserDTO authenticateAndLogin(LoginDTO loginDTO, HttpServletRequest request) {
        UserDetails userDetails = null;
        try {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    loginDTO.getIdentifier(),
                    loginDTO.getPassword()
            );

            // 2. Perform authentication (calls your UserDetailsServiceImpl)
            Authentication authentication = authManager.authenticate(authToken);
            logger.info("Authentication is ", authentication);

            // 3. Store authentication in Spring Security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 4. Store it in session so future requests are authenticated
            request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext());

            // 5. Get user info from principal and convert to DTO
            userDetails = (UserDetails) authentication.getPrincipal();

        } catch (UsernameNotFoundException | BadCredentialsException e){
            logger.warn("Login failed for {}", loginDTO.getIdentifier());
            return null;
        }
        return this.userService.fetchUserDto(userDetails.getUsername());
    }
}
