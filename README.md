### Evan Purkhiser's DJ mixes

This is a small github hosted javascript application that provides a simple
interface to listing and easily listening to all of my DJ mixes. Mixes may be
stored remotely using google drive or on soundcloud. Mixcloud links may also be
added, but the embedded player is currently not supported due to its limited
API.

### The `mixes.json` file

All mix information is stored inside of a json file that is read by the
javascript application to generate the list of mixes and tracks for each mix.
The following template should be used for each mix:

```json
{
	"name": "Anime Punch 2014",
	"date": "2014-04-02-T15:30:00Z",

	"genres": ["UK Hardcore", "Happy Hardcore"],
	"length": 3600000,
	"description": "This is the re-recording of my Anime Punch 2014 set",
	
	"soundcloud_url":  "https://soundcloud.com/evanpurkhiser/anime-punch-2014",
	"mixcloud_url":    "",
	"google_drive_id": {"wav": "0B2TT08R8boDIT0NZbXp5a2JWanc", "mp3": ""},

	"artwork_url": "http://i.imgur.com/1RZBR9Y.png",

	"tracks":
	[
		{
			"artist":  "Al Storm Feat. Taya",
			"title":   "Stars Collide (Exclusive Intro Mix)",
			"cat_id":  "247HC051",
			"url ":    "http://www.beatport.com/track/stars-collide-exclusive-intro-mix/2762571",
			"freebie": false,
			"time":    0
		},
		{
			"artist":  "Clear Vu",
			"title":   "Never 2 Late (Gammer Remix)",
			"cat_id":  "",
			"url ":    "http://www.lololyrics.com/free-4878",
			"freebie": true,
			"time":    300000
		}
	]
}
```

*Notes:*

 * The `time` key for each track should be the number of miliseconds into the
   mix that the track beings. The `length` key of the mix should also be in
   miliseconds.

 * The `freebie` flag indicates if a track was released for free. Used to
   identify free tracks in the application.

 * The URL should be either the locaton that the track can be downloaded or
   purchased at. If excluded no link will be displayed for the track, the
   catelog ID can still be shown if it's not left blank.

 * The Artwork image *should be* at least 500x500 for best optimal viewing.

 * The date of the mix should follow
   [ISO86601](http://en.wikipedia.org/wiki/ISO_8601).

 * Each mix may have more than one genra associated with it. This is useful
   when sorting and searching mixes.
