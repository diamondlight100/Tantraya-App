# Full app audit — tracker

## Plan
1. tsc --noEmit full repo
2. bun run build (prod build)
3. Crawl every route in browser w/ console log capture, screenshot each
4. Cross-check course-registry vs every course route+hub page link vs DB materials pathway/course_slug
5. Check all $courseSlug dynamic routes resolve for every registry slug (no 404s)
6. Check images/assets for 404s across pages
7. Check forum/homework/groups/teach CRUD pages for runtime errors (click around)
8. List every bug found + fix + verify

## Findings log
(fill in as found)
