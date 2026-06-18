package placepro_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import placepro_backend.model.User;
import placepro_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User register(User user) {

        User existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return null;
        }

        return userRepository.save(user);
    }

    // Login User
    public User login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User By ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Search User By Email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Update User
    public User updateUser(Long id, User user) {

        User existingUser =
                userRepository.findById(id).orElse(null);

        if (existingUser != null) {

            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setCollege(user.getCollege());

            return userRepository.save(existingUser);
        }

        return null;
    }

    // Delete User
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Update Profile
    public User updateProfile(Long id, User user) {

        User existingUser =
                userRepository.findById(id).orElse(null);

        if (existingUser != null) {

            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setCollege(user.getCollege());

            return userRepository.save(existingUser);
        }

        return null;
    }

    // Change Password
    public User changePassword(
            Long id,
            String oldPassword,
            String newPassword) {

        User user =
                userRepository.findById(id).orElse(null);

        if (user != null &&
                user.getPassword().equals(oldPassword)) {

            user.setPassword(newPassword);

            return userRepository.save(user);
        }

        return null;
    }
}