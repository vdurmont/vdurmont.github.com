---
tags: post
layout: post
title: Checked VS unchecked exceptions... Fail fast!
date: 2014-01-27
---

The debate is as old as Java itself: should we use _checked_ or _unchecked_ exceptions when there is an error? After reading A LOT of posts on the subject and chatting with lots of developers, I concluded that there is no right answer.

In my apps, I chose to **fail fast**. Let's see what it means.

<!--more-->

# Definition

For those in the back of the class who forgot their Java basics, here is a quick reminder.

A **checked exception** inherits from `java.lang.Exception` and is part of the signature of the methods throwing it:

```java
public void someMethod() throws Exception { /* Do stuff */ }
```

Common examples of checked exceptions are: `java.io.IOException`, `java.sql.SQLException`, etc.

An **unchecked exception** inherits from `java.lang.RuntimeException` and doesn't need to be catched if the developer doesn't feel the need to do it. If it is not catched, it bubbles up to the top of the program.

Common examples of unchecked exceptions are: `java.lang.NullPointerException`, `java.lang.IndexOutOfBoundsException`, `java.lang.IllegalArgumentException`, etc.

The [official guide](http://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html) basically says that "_If a client can reasonably be expected to recover from an exception, make it a checked exception. If a client cannot do anything to recover from the exception, make it an unchecked exception._"

# Fail-fast

Failing fast means to immediately stop the execution of a program and report back to the user when encountering a condition that is likely to lead to failure ([Wikipedia](http://en.wikipedia.org/wiki/Fail-fast)).

In order to avoid any useless costly operation, I like to fail fast in my programs. If something seems wrong, I prefer to stop the execution right away and report to the user. For me the user is _very_ often another application, requesting my APIs via a web request. It means that there is almost no way that my application can recover from an exception.

All I want to do is let the exception bubble up to the top of the program where I placed an [ExceptionResolver](http://docs.spring.io/spring/docs/4.0.0.RELEASE/javadoc-api/org/springframework/web/servlet/HandlerExceptionResolver.html) (or something similar) where I handle all the errors and return an appropriate status code (in the case of a REST application). The best way for me to do that is to use _unchecked_ exceptions.

# Not failing fast: `java.util.HashMap`

The `HashMap` class is, in my opinion, not failing fast enought. Here is an illustration:

```java
public class MapFailsSlowly {
  public static void main(String[] args) {
    Map<String, String> map = new HashMap<>();
    map.put("foo", "my foo string");
    map.put("bar", "my bar string");

    // Code code code

    String value = map.get("baz");
    System.out.println("\"baz\" value's length: " + value.length());
  }
}
```

Running this code will throw a `NullPointerException` with this stacktrace:

```txt
Exception in thread "main" java.lang.NullPointerException
  at com.ligati.failfast.MapFailsSlowly.main(MapFailsSlowly.java:20)
  at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
  at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
  at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
  at java.lang.reflect.Method.invoke(Method.java:606)
  at com.intellij.rt.execution.application.AppMain.main(AppMain.java:120)
```

Awesome. This really helps me. It tells me that my value is null, but it is not the line where I got it so the context is not ideal. And its a really simple code, imagine that I got `value` from another method, I would fail in a portion of the code that has nothing to do with the retrieval of the value.

I'd prefer this implementation:

```java
public class FastFailingMap<K, V> extends HashMap<K, V> {
  @Override
  public V get(Object key) {
    V value = super.get(key);
    if (value == null)
      throw new KeyNotFoundException(key);
    return value;
  }

  public static class KeyNotFoundException extends IllegalStateException {
    public KeyNotFoundException(Object key) {
      super("The key '" + key + "' is not present in the map.");
    }
  }
}
```

When running the previous code with a `FastFailingMap` instead of a `HashMap`, I obtain the following exception.

```txt
Exception in thread "main" com.ligati.failfast.FastFailingMap$KeyNotFoundException: The key 'baz' is not present in the map.
  at com.ligati.failfast.FastFailingMap.get(FastFailingMap.java:10)
  at com.ligati.failfast.MapFailsFast.main(MapFailsFast.java:16)
  at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
  at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
  at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
  at java.lang.reflect.Method.invoke(Method.java:606)
  at com.intellij.rt.execution.application.AppMain.main(AppMain.java:120)
```

It is much better: the code fails exactly when it tries to access the unknown entry and also provide a clear error message which will help to solve the problem.

However, I suppose that `null` is not a valid value but in my code, it is rarely the case. In general, when we perform an operation on a null object, it means that there is something wrong somewhere.

# Conclusion

I finally chose to use unchecked exceptions in all my apps because...

- I can almost never recover from an exception in my apps
- I want to let the exceptions bubble to the top of the app where they are translated into an appropriate status code/error message
- I like when my code fails where the problem is and not 10 lines later and that is the best way to do it without handling tons of exceptions
- Consequence of the previous point: I can provide my end users with elegant error messages because I know what happened when the exception is thrown

What about you? Which kind of exception do you use?
