package com.pantrypal.project;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import java.util.Set;

@CrossOrigin(origins="http://localhost:3000/")
@Controller
public class RestController {

	private final UserDetailsService uService;
	private final FoodDetailsService fService;

	public RestController(UserDetailsService uService, FoodDetailsService fService) {
		this.uService = uService;
		this.fService = fService;
	}

	@RequestMapping(value="/myfood", method=RequestMethod.GET)
	@ResponseBody
	public Set<Food> getMyFood(Authentication authentication) {
		return fService.getFood(((User)authentication.getPrincipal()).getId());
	}

	@RequestMapping(value="/myuser", method=RequestMethod.GET)
	@ResponseBody
	public String currentUsername(Authentication authentication) {
		System.out.println(authentication.getName());
		return authentication.getName();
	}

	@GetMapping("/login")
	public ModelAndView getLoginPage(Model model) {
		model.addAttribute("loginRequest", new User());
		ModelAndView mav = new ModelAndView();
		mav.setViewName("login_page.html");
		return mav;
	}

	@GetMapping("/register")
	public ModelAndView getRegisterPage(Model model) {
		model.addAttribute("registerRequest", new User());
		System.out.println(model);
		ModelAndView mav = new ModelAndView();
		mav.setViewName("register_page.html");
		System.out.println("Loaded /register");
		return mav;
	}

	@PostMapping("/login")
	public ModelAndView login(@ModelAttribute User user) {
		System.out.println(user);
		User authenticated = uService.authenticate(user.getUsername(), user.getPassword());
		ModelAndView mav = new ModelAndView();
		if(authenticated == null) {
			mav.setViewName("error_page.html");
		} else {
			mav.setViewName("redirect:/");
		}
		return mav;
	}

	@PostMapping("/register")
	public ModelAndView register(@ModelAttribute User user) {
		System.out.println(user);
		System.out.println("Hello?");
		User registeredUser = uService.registerUser(user.getUsername(), user.getPassword());
		ModelAndView mav = new ModelAndView();
		if(registeredUser == null) {
			mav.setViewName("error_page.html");
		} else {
			mav.setViewName("redirect:/login");
		}
		return mav;
	}

	public static void main(String a[]){

		String password = "p";
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(password);
		System.out.print(encodedPassword);
	}
}

