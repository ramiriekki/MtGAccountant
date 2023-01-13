package com.github.mtgaccountant.server.serviceImplementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.mtgaccountant.server.constants.MtgAccountantConstants;
import com.github.mtgaccountant.server.dao.CardDao;
import com.github.mtgaccountant.server.dao.CollectionDao;
import com.github.mtgaccountant.server.dao.UserDao;
import com.github.mtgaccountant.server.jwt.CustomerUserDetailsService;
import com.github.mtgaccountant.server.jwt.JwtFilter;
import com.github.mtgaccountant.server.jwt.JwtUtil;
import com.github.mtgaccountant.server.models.Collection;
import com.github.mtgaccountant.server.models.User;
import com.github.mtgaccountant.server.service.UserService;
import com.github.mtgaccountant.server.utils.EmailUtils;
import com.github.mtgaccountant.server.utils.MtgAccountantUtils;
import com.github.mtgaccountant.server.wrapper.UserWrapper;
import com.google.common.base.Strings;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserDao userDao;

    @Autowired
    CollectionDao collectionDao;

    @Autowired
    CardDao cardDao;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    EmailUtils emailUtils;

    /*
     * Create a new user and collection to database if user doesn't already
     * exist.
     */
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);

        try{
            if(validateSignUpMap(requestMap)){
                User user = userDao.findUserByEmail(requestMap.get("email"));
                Collection collection = new Collection();

                if(Objects.isNull(user)){
                    userDao.save(getUserFromMap(requestMap));   // Save user document to database

                    UserWrapper collectionUser = userDao.findUser(requestMap.get("email"));
                    
                    collection.setCards(cardDao.findAllCollectionCards());
                    collection.setUser(collectionUser);

                    collectionDao.save(collection);     // Save user specific collection to database
                    
                    return MtgAccountantUtils.getResponseEntity("Succesfully registered.", HttpStatus.OK);
                } else {
                    return MtgAccountantUtils.getResponseEntity("Email already exists.", HttpStatus.BAD_REQUEST);
                }
            } else {
                return MtgAccountantUtils.getResponseEntity(MtgAccountantConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        return MtgAccountantUtils.getResponseEntity(MtgAccountantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSignUpMap(Map<String, String> requestMap){
        if(requestMap.containsKey("username") && requestMap.containsKey("email") && requestMap.containsKey("password")){
            return true;
        } else {
            return false;
        }
    }

    /*
     * Get user data from request map to User object
     */
    private User getUserFromMap(Map<String, String> requestMap) {
        User user = new User();

        String encodedPassword = new BCryptPasswordEncoder().encode(requestMap.get("password"));

        user.setUsername(requestMap.get("username"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(encodedPassword);
        user.setStatus("true");
        user.setRole("user");

        return user;
    }

    /*
     * Authenticate user by email and password. 
     * If authenticated returns a JWT token
     */
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login.");

        try {
            System.out.println("Authenticate");

            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password"))
            );

            if (auth.isAuthenticated()){
                // System.out.println("Is authenticated");
                if(customerUserDetailsService.getUserDetails().getStatus().equalsIgnoreCase("true")){
                    return new ResponseEntity<String>("{\"token\":\"" + 
                            jwtUtil.generateToken(customerUserDetailsService.getUserDetails().getUsername(),
                                customerUserDetailsService.getUserDetails().getRole()) + "\"}", 
                                HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("{\"message\":\"" + "Wait for admin approval." + "\"}", 
                        HttpStatus.BAD_REQUEST);
                }
            }

        } catch (Exception e) {
            log.error("{}", e);
        }

        return new ResponseEntity<String>("{\"message\":\"" + "Bad Credentials." + "\"}", 
                        HttpStatus.BAD_REQUEST);
    }

    /*
     * For admins. Gets all user data from the database.
     */
    @Override
    public ResponseEntity<List<UserWrapper>> getAllUsers() {
        // System.out.println("Inside getAllUsers");

        try {
            if(jwtFilter.isAdmin()){
                //System.out.println(userDao.findAllUsers());
                return new ResponseEntity<>(userDao.findAllUsers(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /*
     * Admin method. 
     * If user is admin: changes the status of the specified user to the
     * specified status from the request map.
     * 
     * Sends an email to all other admins. 
     */
    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()){
                Optional<User> optional = userDao.findById(Integer.parseInt(requestMap.get("id")));

                if(!optional.isEmpty()){
                    //userDao.updateStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));
                    optional.get().setStatus(requestMap.get("status"));

                    sendMailToAllAdmins(requestMap.get("status"), optional.get().getEmail(), userDao.findAllAdmins());

                    return MtgAccountantUtils.getResponseEntity("User status updated succesfully", HttpStatus.OK);
                } else {
                    MtgAccountantUtils.getResponseEntity("User id doesn't exist", HttpStatus.OK);
                }
            } else {
                return MtgAccountantUtils.getResponseEntity(MtgAccountantConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return MtgAccountantUtils.getResponseEntity(MtgAccountantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> checkToken() {
        return MtgAccountantUtils.getResponseEntity("true", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try {
            User userObj = userDao.findUserByEmail(jwtFilter.getCurrentUser());

            if (!userObj.equals(null)) {
        
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String oldPassword = requestMap.get("oldPassword");
                String dbPassword = userObj.getPassword();

                // System.out.println(oldPassword);
                // System.out.println(dbPassword);

                // If passwords match -> set new
                if (passwordEncoder.matches(oldPassword, dbPassword)){
                    String encodedPassword = new BCryptPasswordEncoder().encode(requestMap.get("newPassword"));

                    userObj.setPassword(encodedPassword);
                    userDao.save(userObj);

                    return MtgAccountantUtils.getResponseEntity("Password updated succesfully.", HttpStatus.OK);
                }

                
                return MtgAccountantUtils.getResponseEntity("Incorrect old password.", HttpStatus.BAD_REQUEST);
            }

            return MtgAccountantUtils.getResponseEntity(MtgAccountantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return MtgAccountantUtils.getResponseEntity(MtgAccountantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // TODO this doesn't work with BCryptPasswordEncoder. --> Generate new temp password that replaces the old one and send it to user.
    @Override
    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
        System.out.println("Forgot password.");

        try {
            User user = userDao.findUserByEmail(requestMap.get("email"));

            if (!Objects.isNull(user) && !Strings.isNullOrEmpty(user.getEmail())) {
                emailUtils.forgotMail(user.getEmail(), "Credentials by MtgAccountant System", user.getPassword());
            }

            return MtgAccountantUtils.getResponseEntity("Check your mail for credentials.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return MtgAccountantUtils.getResponseEntity(MtgAccountantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void sendMailToAllAdmins(String status, String user, List<String> allAdmins) {
        allAdmins.remove(jwtFilter.getCurrentUser());

        if(status != null && status.equalsIgnoreCase("true")) {
            emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser(), "Account approved", "USER:- " + user +" \n is approved by \n ADMIN:- " + jwtFilter.getCurrentUser(), allAdmins);
        } else {
            emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser(), "Account disabled", "USER:- " + user +" \n is disabled by \n ADMIN:- " + jwtFilter.getCurrentUser(), allAdmins);
        }
    }

    @Override
    public ResponseEntity<String> deleteUser() {
        // TODO Delete user.
        return null;
    }
    
}
