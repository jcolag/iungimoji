# iungimoji
A generator for simple memory games

I felt the urge to throw together a quick daily "memory" or "concentration" game, and...this is it.  *Iungo* is Latin for "join" or "connect," and *iungi* appears to be the first-person conjugation of the verb.  So, the goal is to connect matching emoji.

It tracks the number of clicks and the time to complete the puzzle.

## Versions

Depending on how you prefer to run your software, **Iungimoji** provides two choices.

 * Run `iungimoji.js` to create a one-off game that can be loaded into a browser with---other than a common CSS and JavaScript file---a standalone game `game.html` that a player can run in a browser with no changes to the game between runs.
 * Load `index.html` in a browser, which generates a different game per day.  This will work for any day, *but* needs the player to load it from a web server to please the browser's CORS rules.

The latter version also takes arguments in the URL, allowing the player to configure the target date (`date=`) and the board size (`size=`).

