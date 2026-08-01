# Tantraya Image Style Guide

Purpose: lock in the visual convention already established per pathway so any
new image (new deity, new pathway, new practice illustration) matches on the
first generation, instead of needing revision passes.

Rule of thumb: **each tradition keeps its own coherent style** — we are not
forcing one uniform look across all pathways. Consistency is *within* a
pathway, not necessarily *across* pathways, because the traditions themselves
are visually and historically distinct.

---

## Egyptian pathway (`public/deities/*.jpg`)
- **Medium:** real museum/archive photography of actual artifacts (statues,
  faience amulets, reliefs) — never AI-illustrated, never cartoon.
- **Background:** neutral flat gray or soft studio gradient, sometimes a
  plain plinth/pedestal if the object is a statue.
- **Framing:** the deity/artifact centered, fully in frame, no crop.
- **Source:** sourced from real archaeological/museum photography (search,
  not generation) whenever possible — these carry real historical weight the
  user specifically wants (no invented iconography).
- **Do not:** invent glyphs or symbols that don't correspond to real Egyptian
  iconography. If a symbol appears, it must be an attested one (ankh, djed,
  utchat/Eye of Horus, was-sceptre, etc.), explained in the accompanying text.

## Faery pathway (`public/faery/*.jpg`)
- **Medium:** sepia/graphite pencil illustration, antique engraving feel.
- **Border:** ornate gold filigree flourish in all four corners, thin gold
  rule line framing the full image.
- **Palette:** warm cream/parchment background, monochrome sepia figures,
  selective gold/amber glow for magical elements (portals, light, fire).
- **Mood:** romantic, liminal, folkloric — never cutesy/cartoon fae.

## Buddhist / Phowa pathway (`public/buddhist/phowa/*.webp`)
- **Medium:** loose watercolor wash.
- **Subject:** a single silhouetted seated meditator, back or three-quarter
  view, on a small rock/island, facing a misty lake and hills.
- **Palette:** desaturated blue-gray mist, occasional warm dawn/dusk wash at
  the horizon; the only saturated color allowed is the chakra light-points
  or central-channel light line, kept small and precise against the muted
  wash.
- **Do not** add facial detail or realism — the figure stays a soft
  silhouette throughout the set.

## Yogic / Surya Namaskara pathway (`public/yogic/surya-namaskara/*.webp`)
- **Medium:** ink line sketch, loose confident linework, minimal shading
  (a few soft gray fill strokes for form only).
- **Figure:** faceless/featureless head (no eyes, mouth, ears), androgynous
  build, fully nude (anatomical clarity for the pose, not stylized clothing).
- **Background:** aged parchment/paper texture, warm tan, stained/foxed
  edges.
- **Framing:** wide horizontal canvas, figure roughly centered, full pose
  visible with room around it.

## Tantric / Yantra & Mahavidya pathway
- **Two layers, kept separate, never invented:**
  1. `*-line.png` — clean black-line geometric yantra diagrams (bindu,
     triangles, lotus petals, bhupura/gates), traditionally accurate to each
     goddess's actual yantra, not decorative filler.
  2. `*-original.jpeg` — a small number of real reference yantra images used
     as source/comparison.
- Goddess portraits themselves are **not** photographic here — visual
  representation is the accurate yantra + text (myth, symbolism, sadhana),
  never a generated "artistic" goddess portrait standing in for scholarship.
- **Do not** invent a yantra layout. If unsure of a goddess's traditional
  yantra structure, look it up before drawing it.

## Tree of Life (Qabalah) pathway
- **Medium:** coded SVG diagram (`tree-of-life-widget.tsx`), not a raster
  image at all. Correspondences (archangel, magical image, etc.) are shown
  as text in a side panel per sphere, never as a generated "sigil" graphic.
- **Reasoning:** archangel sigils and planetary glyphs rendered as small
  images get illegible/cut off at UI sizes and carry no real teaching value
  without a full explanation — the tree diagram + correspondence text is the
  more effective and durable format on screen.

## Meridian diagrams (`public/meridians/*.png`)
- **Medium:** clean anatomical line-art body outline (front/back/side views),
  used as a base layer with meridian pathways drawn on top.
- **Purpose:** functional/technical, not decorative — accuracy over mood.
  Keep consistent proportions and line weight across all views so meridian
  paths line up correctly view to view.

---

## When adding a new pathway or deity
1. Identify which tradition it belongs to (Egyptian / Faery / Buddhist /
   Yogic / Tantric / Qabalah / TCM) and use that pathway's established style
   above — don't invent a new look.
2. If it's a genuinely new tradition with no precedent here, propose a style
   (medium, palette, framing) and get sign-off before generating a full set,
   rather than generating first and revising after.
3. Never fabricate symbols/sigils/glyphs presented as if traditional —
   research the actual iconography first, or omit imagery and rely on text.
