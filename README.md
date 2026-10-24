# Traditional Checklist

A mobile-friendly Hat Trick Hangman checklist built with HTML, CSS, and JavaScript.

## Use

- Start with six rows. Use the Material Design + button to add more.
- Check a task to strike through its text.
- Email copies a formatted snapshot of every row and its checked state, with recreation instructions underneath.
- The message opens in your configured email application, addressed to codefolio.work@gmail.com with subject `re: Calling For Testcliff`.
- Paste into the email body and click Send. This button does not send automatically.
- If clipboard access is unavailable, a preview lets you select and copy the email manually.
- A configured email application and rich-text paste support are needed. Email apps may substitute fonts or strip formatting.
- Tasks are currently stored only in the open page. Refreshing or closing the page resets them.

## GitHub Pages

The Pages workflow deploys the repository root when main is updated.

In Settings → Pages, select **GitHub Actions** as the build and deployment source.

Production: https://pythonidaer.github.io/traditional-checklist/

## Local preview

Run `python3 -m http.server 8000` in this directory and open http://localhost:8000.
Clipboard features require HTTPS or localhost.

## Assets

- Puck SVG: Pythonidaer/calling-for-testcliff, mobile/capacitor-ios-prep branch, index.html brand.
- Great Vibes by The Great Vibes Pro Project Authors, SIL Open Font License 1.1; see fonts/OFL.txt. The bundled font is subset to the fixed heading “Hat Trick”.
- Add icon: Google Material Design Icons, Apache License 2.0.
