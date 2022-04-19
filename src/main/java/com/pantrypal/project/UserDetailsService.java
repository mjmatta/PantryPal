package com.pantrypal.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = repository.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException(username);
		}

		return user;

	}

	public User registerUser(String login, String password) {
		if (login == null || password == null) {
			return null;
		} else {
			User user = new User();

			PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String encodedPassword = passwordEncoder.encode(password);
			user.setUsername(login);
			user.setPassword(encodedPassword);
			user.setRole("ROLE_USER");
			return repository.save(user);
		}
	}

	public User authenticate(String login, String password) {
		return repository.findByUsername(login);
	}

}
