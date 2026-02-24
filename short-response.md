# Short Response Questions

## Question 1: Promise Chaining

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

```js
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

**Your Answer:**

The bug is that the first `.then()` never `return`s anything, `readingPromise` is assigned locally but not `return`ed, so the next `.then()` receives `undefined`. The fix is to add a `return` statement

```js
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    return response.json();
  })
```

## Question 2: Development Servers and CORS

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

**Your Answer:**

The `file://` protocol doesn't go through a real web server, and browsers block **ES modules** and `fetch()` requests made from it due to **CORS** and security restrictions. The student should run a local development server so the page is served over `http://localhost`, which the browser treats as a proper origin and allows these features to work.

## Question 3: The `fetch` Response Object

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

```js
const response = await fetch(url);
const data = await response.json();
```

**Your Answer:**

`.catch()` only catches network-level failures, it does not catch **HTTP** `error` responses like `404` or `500`, because from fetch's perspective those requests succeeded in reaching the server. Without checking `response.ok`, a `404` response would still go to `response.json()`, likely parsing an `error` page body and producing confusing or broken data rather than solving the actual problem.

## Question 4: Async/Await Conversion

Rewrite the following `.then()`-based code using `async`/`await` with `try`/`catch`:

```js
const getJoke = () => {
  return fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart')
    .then((response) => {
      if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
      return response.json();
    })
    .then((data) => {
      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error };
    });
};
```

**Your Answer:**

```js
  const getJoke = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart');
      if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
  };
```


## Question 5: `event.preventDefault()` and Form Handling

A student writes a form handler but the data never displays. Their code:

```js
form.addEventListener('submit', (event) => {
  const name = form.elements.name.value;
  document.querySelector('#output').textContent = name;
});
```

What is wrong? What happens when they click submit, and how do they fix it?

**Your Answer:**

The handler is missing `event.preventDefault()`. When the form is submitted, the browser's default behavior is to reload the page, which wipes out any DOM changes before the user can see them. The fix is to add `event.preventDefault()` as the first line of the handler so the page stays put and the output can actually be displayed.

## Question 6: Putting It All Together

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

- A. Parse the response body with `await response.json()`
- B. Call `event.preventDefault()` to stop the page from reloading
- C. Check `response.ok` and throw an error if the response failed
- D. Update the DOM with the Pokemon's data
- E. Add a `'submit'` event listener to the form
- F. Handle errors in the `catch` block (display an error message)
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- I. Reset the form with `form.reset()`
- J. Create the HTML form with a name input and output elements for displaying results

**Your Answer:**

First you build the **HTML** structure (J), then attach the **submit listener** (E). When the form is submitted you prevent the default reload (B), grab the input value (G), and fire off the `fetch` request (H). Then you validate the response (C), parse the body (A), update the **DOM** (D), and reset the form (I). `Error` handling (F) sits at the end to catch anything that went wrong in the steps above.
