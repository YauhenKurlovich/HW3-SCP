package com.leverx.leverxspringdemo.controller;

import com.leverx.leverxspringdemo.domain.Destination;
import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leverx.leverxspringdemo.service.CloudService;

import java.util.List;

@Controller
public class HomeController {
	
	@Autowired
	private CloudService cloudService;

	@Autowired
	private CloudPlatform platform;

	@RequestMapping(value="/destinations", method=RequestMethod.GET)
	public String getHomes(Model model) {
		String appName = platform.getApplicationName();
		model.addAttribute("appName", appName);
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);
		return "index";
	}

	@RequestMapping(value="/appname", method=RequestMethod.GET)
	public String getHome(Model model) {
		String appName = cloudService.getApplicationName();
		model.addAttribute("appName", appName);
		return "index";
	}
}
