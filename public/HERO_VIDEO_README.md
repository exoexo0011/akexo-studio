# Drop your hero video here as `hero.mp4`

The `<Hero>` component looks for `/hero.mp4` (served from this `public/`
folder) and scrubs through the timeline based on scroll position.

## Recommended export

| Property | Value |
|---|---|
| File name | `hero.mp4` |
| Codec | H.264 |
| Container | MP4 |
| Duration | 4 to 8 seconds |
| Frame rate | 24 or 30 fps |
| Resolution | 1920×1080 (or 2560×1440 for retina) |
| Bitrate | 4 to 8 Mbps |
| Audio | none (the video is muted, strip the audio track to save bytes) |
| File size | aim for under 5 MB |

## Why these settings

Scroll-controlled video sets `video.currentTime` on every animation frame
while you scroll through the hero. Browsers seek faster on:

1. Short duration. The whole timeline maps to ~100vh of scroll, so anything
   over 8s feels too slow per inch of scroll.
2. Low keyframe interval. Re-encode with a keyframe every ~0.5s so seeking
   lands on a clean frame. On a 30fps source: `-x264-params keyint=15`.
3. No audio track.
4. `+faststart` so the moov atom is at the front of the file and playback
   can begin before the file is fully buffered.

## Quick FFmpeg recipe

```bash
ffmpeg -i source.mov \
  -an \
  -c:v libx264 \
  -preset slow \
  -crf 22 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -x264-params keyint=15:min-keyint=15:scenecut=0 \
  hero.mp4
```

## Fallback

If `hero.mp4` is missing or fails to load, the hero falls back to a solid
cobalt (`#0E1E66`) background with the same dark overlay on top. Text stays
readable. No errors thrown.

## Reduced motion

If the visitor has `prefers-reduced-motion: reduce` enabled, the scroll
handler is skipped entirely and the video sits paused on its first frame
(effectively a static poster). The rest of the page still animates normally.
