package com.pantrypal.project;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins="https://therealpantrypal.herokuapp.com:3000/")
@Controller
public class RestController {

	private final UserDetailsService uService;
	private final FoodDetailsService fService;

	public RestController(UserDetailsService uService, FoodDetailsService fService) {
		this.uService = uService;
		this.fService = fService;
	}

	//POST method for adding new food with User information
	@RequestMapping(value="/myfood", method=RequestMethod.POST)
	@ResponseBody
	public Food addFoodItem(@RequestBody Map<String, Object> payload, Authentication authentication) {
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date buyDate = null;
		Date expirationDate = null;
		try{
			buyDate = formatter.parse((String)payload.get("buyDate"));
			expirationDate = formatter.parse((String)payload.get("expirationDate"));
		}
		catch(Exception ParseException) {
			
		}
		System.out.println("New Food: " + (String)payload.get("name"));
		System.out.println(payload);
		Food food = fService.addFood((String)payload.get("name"), buyDate, expirationDate, (String)payload.get("category"), ((User)authentication.getPrincipal()));
		return food;
	}

	//GET Method to get all food from user's 3 categories
	@RequestMapping(value="/myfood", method=RequestMethod.GET)
	@ResponseBody
	public ArrayList<Set<Food>> getMyFood(Authentication authentication) {
		Integer uid = ((User)authentication.getPrincipal()).getId();
		ArrayList<Set<Food>> a = new ArrayList<>();
		a.add(fService.getCategory(uid, "Pantry"));
		a.add(fService.getCategory(uid, "Fridge"));
		a.add(fService.getCategory(uid, "Freezer"));
		System.out.println(a);
		return a;
	}

	//DELETE food at id
	@RequestMapping(value="/myfood/{id}", method=RequestMethod.DELETE)
	@ResponseBody
	public void deleteFoodItem(@PathVariable Integer id) {
		fService.deleteFood(id);
	}

	//GET food from id, used for Edit function
	@RequestMapping(value="/myfood/{id}", method=RequestMethod.GET)
	@ResponseBody
	public Food getAFood(@PathVariable Integer id) {
		System.out.println("Get food from Id: "+ id);
		Food f = fService.getFoodById(id);
		System.out.println(f.getName());
		System.out.println(f.getId());
		return fService.getFoodById(id);
	}

	//Submit for Edit function, updates food at ID with new information
	@RequestMapping(value="/myfood/{id}", method=RequestMethod.PUT)
	@ResponseBody
	public void changeFood(@PathVariable Integer id, @RequestBody Map<String, Object> payload) {
		System.out.println("Change food request: " + payload);
		Food old = fService.getFoodById(id);
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date buyDate = null;
		Date expirationDate = null;
		try{
			buyDate = formatter.parse((String)payload.get("buyDate"));
			expirationDate = formatter.parse((String)payload.get("expirationDate"));
		}
		catch(Exception ParseException) {
			
		}
		old.setName((String)payload.get("name"));
		old.setCategory((String)payload.get("category"));
		old.setBuyDate(buyDate);
		old.setExpirationDate(expirationDate);
		fService.updateFood(old);
	}

	//returns user's username at path /myuser
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

