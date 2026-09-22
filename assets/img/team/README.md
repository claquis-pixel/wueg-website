# Board headshots

Drop headshot files in this folder and point the `<img src="...">` in
`site/team.html` at them. Nothing else needs to change.

## Naming

Use lowercase, hyphenated first and last name, `.jpg`:

```
jane-doe.jpg
li-wei.jpg
maria-garcia-lopez.jpg
```

Then in `team.html`:

```html
<img class="person__photo" src="assets/img/team/jane-doe.jpg" alt=""
     width="400" height="400" loading="lazy" decoding="async">
```

`alt=""` is correct here — the person's name is already in the card text right
next to the photo, so a screen reader announcing it twice is noise.

Anyone without a photo yet keeps `placeholder.svg`. A board page with a few
placeholders looks fine; a board page with three different photo styles does
not.

## Format

| | |
|---|---|
| Crop | Square, 1:1 |
| Size | 800 × 800 px |
| Format | JPEG, quality ~82 |
| Target weight | Under 150 KB each |
| Framing | Head and shoulders, eyes roughly one-third down |

The cards render at about 300 px wide, so 800 px covers retina displays with
room to spare. Anything larger is wasted bandwidth on a page with 10+ photos.

## Batch-processing a folder of raw photos

With ImageMagick installed:

```bash
cd site/assets/img/team
for f in raw/*.jpg; do
  magick "$f" -auto-orient \
    -resize 800x800^ -gravity north -extent 800x800 \
    -strip -quality 82 "$(basename "${f%.*}").jpg"
done
```

`-gravity north` biases the square crop toward the top of the frame, which is
usually where the face is. Check the results — re-crop by hand any that cut off
a chin.

To check nothing ended up oversized:

```bash
find . -name '*.jpg' -size +200k
```

## One thing to get right before publishing

Ask each board member before putting their photo on a public page, and take it
down promptly if they later ask. Some students have safety, visa, or privacy
reasons for not wanting a searchable photo, and they will not always volunteer
them. A name and role with `placeholder.svg` is a perfectly good card.
