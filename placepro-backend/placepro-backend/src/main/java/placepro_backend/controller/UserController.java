package placepro_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.model.User;
import placepro_backend.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // Register User
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        User savedUser = userService.register(user);

        if (savedUser != null) {
            return "Registration Successful";
        }

        return "Email Already Exists";
    }

    // Login User
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser =
                userService.login(
                        user.getEmail(),
                        user.getPassword());

        if (existingUser != null) {
            return "Login Successful";
        }

        return "Invalid Email or Password";
    }

    // Get All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get User By ID
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Search User By Email
    @GetMapping("/users/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // Update User
    @PutMapping("/users/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return userService.updateUser(id, user);
    }

    // Delete User
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";
    }

    // Update Profile
    @PutMapping("/users/profile/{id}")
    public User updateProfile(
            @PathVariable Long id,
            @RequestBody User user) {

        return userService.updateProfile(id, user);
    }

    // Change Password
    @PutMapping("/users/change-password/{id}")
    public User changePassword(
            @PathVariable Long id,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {

        return userService.changePassword(
                id,
                oldPassword,
                newPassword);
    }
}