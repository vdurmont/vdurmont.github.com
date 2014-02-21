---
layout: post
title: JSON Mockito matchers
---

Yesterday, I wrote about [custom Mockito matchers](http://vincent-durmont.com/2014/02/20/custom-mockito-matchers-why-and-how.html) and this article is an example of a real usage of these matchers. In my code, I often use wrapper services that call distant APIs. The service builds a [JSONObject](http://www.json.org/javadoc/org/json/JSONObject.html) that will be sent to the server so I need to make sure that it is correct. In order to do that, I need a custom JSON Mockito matcher.

<!--more-->

The class `UserService` will use the class `ApiWrapper` in order to create a user on a distant account server. Here is the first test I wrote:

	@Test
	public void test_user_is_posted_to_distant_server() {
		// GIVEN
		ApiWrapper apiWrapper = mock(ApiWrapper.class);
		UserService userService = new UserService(apiWrapper);

		User user = new User();
		user.setEmail("vdurmont@gmail.com");
		user.setName("Vincent DURMONT");

		// WHEN
		userService.create(user);

		// THEN
		JSONObject json = new JSONObject();
		json.put("email", user.getEmail());
		json.put("name", user.getName());

		verify(apiWrapper).post(json);
	}

But when I run the test, I got this failure:

	Argument(s) are different! Wanted:
	apiWrapper.post(
		{"email":"vdurmont@gmail.com","name":"Vincent DURMONT"}
	);
	-> at com.github.vdurmont.AppTest.test_user_is_posted_to_distant_server(AppTest.java:34)
	Actual invocation has different arguments:
	apiWrapper.post(
		{"email":"vdurmont@gmail.com","name":"Vincent DURMONT"}
	);
	-> at com.github.vdurmont.service.UserService.create(UserService.java:18)

	/*
	I got this failure:

	java.lang.AssertionError
		at org.junit.Assert.fail(Assert.java:86)
		at org.junit.Assert.assertTrue(Assert.java:41)
		at org.junit.Assert.assertTrue(Assert.java:52)
		at com.github.vdurmont.AppTest.test_json_equals(AppTest.java:25)
	 */

This is due to the fact that `JSONObject` doesn't overrides the method `equals` so when Mockito uses the default equals matcher, it fails.

In order to have a simple verification, I wrote 2 custom matchers: one for [JSONObject](http://www.json.org/javadoc/org/json/JSONObject.html) and one for [JSONArray](http://www.json.org/javadoc/org/json/JSONArray.html).

You can [find the code on github](https://github.com/vdurmont/json-mockito-matchers).