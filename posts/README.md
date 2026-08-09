# How to add a news post — no coding required

This folder holds every news post on the site, one file per post. Follow
these steps and you don't need to understand any code.

## Step 1 — Add your photo

Put the picture for your post in:

```
assets/img/postImgs/
```

Give it a simple, descriptive filename with no spaces — use dashes
instead. For example: `spring-2026-casino-night.jpg`.

## Step 2 — Create your post file

1. Make a copy of [`_TEMPLATE.js`](_TEMPLATE.js), inside this same
   `posts/` folder.
2. Rename your copy to `YYYY-MM-DD-a-short-title.js`, using the date
   you're writing the post and a few words describing it. Dashes
   instead of spaces, no punctuation. For example:

   ```
   2026-08-10-casino-night-recap.js
   ```

   The date at the front just keeps the folder tidy and easy to
   scan — it doesn't control anything by itself (that's Step 3's
   `date:` field below).

3. Open your new file in any text editor and fill in the blanks:

   ```js
   addPost({
       title: "Casino Night Recap",
       date: "2026-08-10",
       author: "Jane Doe",
       image: "assets/img/postImgs/spring-2026-casino-night.jpg",
       body: `
           We had a blast at Casino Night this year...

           Thanks to everyone who came out and made it a success!
       `
   });
   ```

   A few rules to keep in mind:
   - `date` must be `YYYY-MM-DD` (year-month-day, with dashes). This
     is what controls the order posts show up in — the newest date
     is always shown first.
   - `image` must point to the photo you added in Step 1.
   - For `body`, leave a **blank line** between paragraphs — that's
     how the page knows where one paragraph ends and the next
     begins. Write as many paragraphs as you want.
   - Keep the quotation marks, commas, and curly braces/backticks
     exactly where they are in the template — only change the text
     between them.

## Step 3 — Register your post

Find and open [`../js/posts-manifest.js`](../js/posts-manifest.js) and add your
new filename to the list, for example:

```js
window.POST_FILES = [
    "2026-08-10-casino-night-recap.js",
    "2026-08-10-welcome-to-khk-news.js"
];
```

The order in this list doesn't matter — posts are always sorted
newest-first automatically using the `date` you set in Step 2. This
is the only other file you need to touch.

## That's it!

Save everything and open `newspage.html` (or the live site) — your
post will appear automatically, both on the main news page and on
the "View All" page, with its own shareable page at
`post.html?post=2026-08-10-casino-night-recap` (built from your
filename automatically).

## Removing or editing a post

- **Edit**: just open the post's `.js` file and change the text.
- **Remove**: delete the post's `.js` file from this folder AND
  remove its filename from `js/posts-manifest.js`.

## Troubleshooting

If a post isn't showing up:
- Open the browser's developer console (F12 → Console tab) — the
  post loader prints a clear error there if a filename is missing
  or a required field (title/date/image) wasn't filled in.
- Double check the filename you added to `js/posts-manifest.js`
  matches your file in `posts/` **exactly**, including `.js` at the
  end.
- Make sure `date` is in `YYYY-MM-DD` format.
