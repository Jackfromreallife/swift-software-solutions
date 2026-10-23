# Badminton Pathway (reallife.sg/badminton)

Bilingual (中文 / English) badminton progression framework for singles and doubles, kids and adults.

## Files

| File | What it is |
|---|---|
| `threads.py` | **The framework content.** Each skill thread with its target and ⭐⭐⭐ standard per level. Edit this. |
| `levels_meta.json` | Level goals, kids quests and track notes. |
| `singles.template.md`, `doubles.template.md` | Fixed sections of the two framework documents (principles, assessment, rules). |
| `page.template.html` | The mobile web page. |
| `build.py` | Builds everything below from the files above. |
| `badminton-singles-framework.md`, `badminton-doubles-framework.md` | Generated framework documents. |
| `../../public/badminton/index.html` | Generated web page, deployed with the site. |

## Update the framework

```bash
python docs/badminton/build.py
```

Then commit, and deploy the site as usual. The page is in `public/`, so the normal site build includes it.
