---
layout: post
title: Custom Mockito matchers
---

[Mockito](http://mockito.org) is an awesome mocking framework that helps you simulate objects and services which have a complex or non-deterministic behavior in your unit tests.

When I check if there are interactions with some of the mocks, I sometimes want to perform custom verifications. In order to do that, let's see how to write custom matchers with Mockito!

<!--more-->

# Basic usage

Here is a basic example of how to check if a mock is called. We have a service `MyService` which has a method `doStuff()` which sends a message.

	public class MyService {
		private final MessageService messageService;

		public MyService(MessageService messageService) {
			this.messageService = messageService;
		}

		public void doStuff(Human author) {
			// TODO do complex stuff

			Message message = new Message(author);
			this.messageService.send(message);

			// TODO do complex stuff again
		}
	}

	public class Message {
		private final Human author;

		public Message(Human author) {
			this.author = author;
		}

		public Human getAuthor() {
			return author;
		}
	}

	public class Human {
		private final String name;
		private final Gender gender;

		public Human(String name, Gender gender) {
			this.name = name;
			this.gender = gender;
		}

		public String getName() {
			return name;
		}

		public Gender getGender() {
			return gender;
		}
	}

	public class MessageService {
		public void send(Message message) {
			// TODO send the message :)
		}
	}

We can write a test that checks that a message is sent when we `doStuff()`:

	@RunWith(JUnit4.class)
	public class MyServiceTest {
		@Test
		public void doStuff_sends_a_message() {
			// GIVEN
			MessageService mockMessageService = mock(MessageService.class);
			MyService service = new MyService(mockMessageService);

			Human author = new Human("Vincent", Gender.MALE);

			// WHEN
			service.doStuff(author);

			// THEN
			verify(mockMessageService).send(any(Message.class));
		}
	}

As you can see, Mockito enables us to simulate the `MessageService` in order to check that it is correctly called. But in this case, we have no way to compare the author of the sent message with our `author` variable.

# Matcher without argument

Let's write a custom matcher that will replace the `any(Message.class)` and check that the author is a male. The test would look like:

	@Test
	public void doStuff_sends_a_message_from_a_male() {
		// GIVEN
		MessageService mockMessageService = mock(MessageService.class);
		MyService service = new MyService(mockMessageService);

		Human author = new Human("Vincent", Gender.MALE);

		// WHEN
		service.doStuff(author);

		// THEN
		verify(mockMessageService).send(authorIsAMale());
	}

Here is the custom matcher:

	public class MaleMatcher extends ArgumentMatcher<Message> {
		public static Message authorIsAMale() {
			return argThat(new MaleMatcher());
		}

		@Override
		public boolean matches(Object argument) {
			// TODO check null, etc.
			return Gender.MALE.equals(((Message) argument).getAuthor().getGender());
		}
	}

# Matcher with arguments

Now let's say we want to compare the author of the sent message with the author given in parameter of the `doStuff()` method. Here is how it works:

	@Test
	public void doStuff_sends_a_message_from_the_given_author() {
		// GIVEN
		MessageService mockMessageService = mock(MessageService.class);
		MyService service = new MyService(mockMessageService);

		Human author = new Human("Vincent", Gender.MALE);

		// WHEN
		service.doStuff(author);

		// THEN
		verify(mockMessageService).send(authorIs(author));
	}

	public class AuthorMatcher extends ArgumentMatcher<Message> {
		public static Message authorIs(Human author) {
			return argThat(new AuthorMatcher(author));
		}

		private final Human expected;

		public AuthorMatcher(Human author) {
			this.expected = author;
		}

		@Override
		public boolean matches(Object argument) {
			if (argument == null) return false;
			if (!(argument instanceof Message)) return false;

			Message msg = (Message) argument;
			if (expected == null) return msg.getAuthor() == null;

			Human author = msg.getAuthor();

			if (expected.getName() == null) return author.getName() == null;
			if (!expected.getName().equals(author.getName())) return false;

			if (expected.getGender() == null) return author.getGender() == null;
			return expected.getGender().equals(author.getGender());
		}
	}

# Going further

Do not forget that you can override the `describeTo` method in the matchers. It will enable you to display custom error messages!

You can find [the code on Github](https://github.com/vdurmont/custom-mockito-matchers-example).

I hope it will be useful for you!