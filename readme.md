futusign drupal
====
Manage and display digital signage content

- [Installation](#installation)
- [Usage](#usage)
- [Uninstall](#uninstall)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

Installation
====
The futusign module has only been tested on 8.2.6.

1. Copy the `futusign` folder into your `modules` folder.
2. Install the `futusign` module via the `Extend` administration page

Usage
====
Using your favorite presentation tool, e.g., PowerPoint, create a slide
show and save it as a portable document format (PDF) file.

From the Drupal administrative screens.

1. Add a new `Playlist` term from the `Structure > Taxonomy`
administration page.
2. Add a new `Slide Deck` from the `Content` administration page;
uploading the PDF file.
3. While adding the slide deck, also add it onto the playlist created
above.
4. Add a new `Screen` from the `Content` administration page.
5. While adding the screen, also subscribe it to the playlist created
above.
6. View the screen; it should be playing the slide deck.

To create a digital sign, connect a television to a computer with a modern web
browser and have it load the screen's URL. The loaded web application will
check every minute to automatically apply changes made on the administrative
screens.

**Caveats**

The web browser will not load the web application unless it have network
access to the WordPress server.

There are several known situations where the web application will display an
error until the situation is corrected (will recover within a minute).

* If the web application is running and loses network access to the WordPress
server, it will display a *no network* icon.
* If the screen is not subscribed to a playlist, the web application will
display a *no slide decks* icon.
* If the screen is subscribed to one or more playlists that are all empty,
the web application will display a *no slide decks* icon.

Uninstall
===
After uninstalling the module from the `Extend` administration screen,
there are a number of content and structure items to delete.

* Content: All Screens and Slide Decks
* Structure > Views > Playlists
* Structure > Views > Screens
* Structure > Views > Slide Decks
* Structure > Content types > Screen
* Structure > Content types > Slide Deck
* Structure > Taxonomy > Playlist

Contributing
====
Submit bug or enhancement requests using the GitHub issues feature.

Contact
====
General questions and comments can be directed to
<mailto:john@larkintuckerllc.com>.

License
====
GPLv2 or later <https://www.gnu.org/licenses/gpl.html>
