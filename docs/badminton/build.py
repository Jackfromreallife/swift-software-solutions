"""Build the badminton pathway outputs from threads.py.

Writes:
  docs/badminton/badminton-singles-framework.md
  docs/badminton/badminton-doubles-framework.md
  public/badminton/index.html        (served at reallife.sg/badminton)

Run from anywhere:  python docs/badminton/build.py
"""
import json
import sys
from pathlib import Path

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(HERE))
from threads import SINGLES, DOUBLES  # noqa: E402

LEVELS = [
    {"n": 1, "zh": "启蒙级", "en": "Foundation", "e": "🐣", "ks": {"zh": "小雏鸟", "en": "Chick"}, "kd": {"zh": "双雏鸟", "en": "Twin Chicks"}, "age": "6–8",
     "ap": {"zh": "零基础 / 刚接触", "en": "Absolute beginner"}, "dp": {"zh": "两人合作游戏", "en": "Partner cooperation games"},
     "eq": {"zh": "能偶尔击中球", "en": "Can occasionally hit the shuttle"}, "dur": "3–6", "entry": None},
    {"n": 2, "zh": "入门级", "en": "Beginner", "e": "🐦", "ks": {"zh": "小飞燕", "en": "Swallow"}, "kd": {"zh": "比翼燕", "en": "Paired Swallows"}, "age": "7–10",
     "ap": {"zh": "会打但无规范动作", "en": "Casual player, no formal technique"}, "dp": {"zh": "知道规则与基本站位", "en": "Knows rules & basic positions"},
     "eq": {"zh": "能简单对打", "en": "Can rally casually"}, "dur": "3–6", "entry": 1},
    {"n": 3, "zh": "基础级", "en": "Improver", "e": "🦅", "ks": {"zh": "雏鹰", "en": "Young Eagle"}, "kd": {"zh": "双鹰", "en": "Eagle Pair"}, "age": "8–12",
     "ap": {"zh": "动作初步规范", "en": "Basic correct technique"}, "dp": {"zh": "能用前后 / 左右站位", "en": "Uses front-back & side-by-side"},
     "eq": {"zh": "能打满底线、懂规则", "en": "Clears to baseline, knows rules"}, "dur": "3–6", "entry": 2},
    {"n": 4, "zh": "进阶级", "en": "Intermediate", "e": "🦅", "ks": {"zh": "雄鹰", "en": "Eagle"}, "kd": {"zh": "鹰组合", "en": "Eagle Team"}, "age": "9–13",
     "ap": {"zh": "社区 / 俱乐部中等", "en": "Club intermediate"}, "dp": {"zh": "攻守转换与轮转", "en": "Attack-defence rotation"},
     "eq": {"zh": "能稳定四方球、有简单战术", "en": "Consistent 4-corner game, basic tactics"}, "dur": "6–12", "entry": 3},
    {"n": 5, "zh": "提高级", "en": "Advanced", "e": "🔥", "ks": {"zh": "猎鹰", "en": "Falcon"}, "kd": {"zh": "猎鹰组合", "en": "Falcon Team"}, "age": "10–15",
     "ap": {"zh": "俱乐部高水平", "en": "Strong club player"}, "dp": {"zh": "有固定战术与分工", "en": "Set plays & clear roles"},
     "eq": {"zh": "能参加地区业余比赛", "en": "Competes in local amateur events"}, "dur": "6–12", "entry": 4},
    {"n": 6, "zh": "竞技级", "en": "Competitive", "e": "🏆", "ks": {"zh": "金翅鹏", "en": "Golden Roc"}, "kd": {"zh": "双翼金鹏", "en": "Golden Roc Pair"}, "age": "12+",
     "ap": {"zh": "业余高手 / 青少年竞技", "en": "Top amateur / junior competitive"}, "dp": {"zh": "竞技级组合", "en": "Competitive pair"},
     "eq": {"zh": "能参加省市级比赛", "en": "Ready for regional / provincial events"}, "dur": "6–12", "entry": 5},
]

DOMAINS = {
    "G": {"zh": "握拍与准备", "en": "Grip & Ready", "c": 0}, "F": {"zh": "步法", "en": "Footwork", "c": 1},
    "S": {"zh": "发球与接发", "en": "Serve & Return", "c": 2}, "R": {"zh": "后场技术", "en": "Rear Court", "c": 3},
    "M": {"zh": "中场技术", "en": "Mid Court", "c": 4}, "N": {"zh": "网前技术", "en": "Net", "c": 5},
    "T": {"zh": "战术", "en": "Tactics", "c": 2}, "P": {"zh": "体能", "en": "Physical", "c": 0},
    "X": {"zh": "心理与规则", "en": "Mental & Rules", "c": 4},
    "DS": {"zh": "发球", "en": "Serve", "c": 2}, "DR": {"zh": "接发球", "en": "Return of Serve", "c": 5},
    "DD": {"zh": "平抽挡", "en": "Drive & Flat Game", "c": 4}, "DA": {"zh": "后场进攻", "en": "Rear Attack", "c": 3},
    "DN": {"zh": "前场封网", "en": "Front Court", "c": 5}, "DF": {"zh": "防守", "en": "Defence", "c": 1},
    "DP": {"zh": "站位与轮转", "en": "Formation & Rotation", "c": 0}, "DC": {"zh": "沟通与配合", "en": "Communication", "c": 1},
    "DT": {"zh": "战术", "en": "Tactics", "c": 2}, "DX": {"zh": "规则与心理", "en": "Rules & Mental", "c": 4},
    "DM": {"zh": "混双", "en": "Mixed Doubles", "c": 2},
}

TRACKS = {"kids": {"sec": 5, "zh": "少儿版", "en": "Kids"}, "adults": {"sec": 6, "zh": "成人版", "en": "Adult"}}


def resolve(threads, track):
    """Per-track view: [{code, dom, name, lv: {n: {t, m}}}] with overrides applied."""
    out = []
    for th in threads:
        over = th[track]
        lv = {}
        for n in range(1, 7):
            v = over[n] if n in over else th["levels"].get(n)
            if v:
                lv[n] = v
        if lv:
            out.append({"code": th["code"], "dom": th["dom"], "name": th["name"], "lv": lv})
    return out


def bi(o):
    return o["zh"] if o["zh"] == o["en"] else f'{o["zh"]} {o["en"]}'


def md_track(fmt, track, threads, meta):
    tr = TRACKS[track]
    s = tr["sec"]
    kids = track == "kids"
    L = []
    L.append(f'## {s}. {tr["zh"]}进阶体系 / {tr["en"]} Track\n')
    L.append(f'### {s}.0 {tr["zh"]}特别说明 / {tr["en"]} Track Notes\n')
    L.append("| 要点 | Point |\n|---|---|")
    for n in meta["notes"]:
        L.append(f'| {n["zh"]} | {n["en"]} |')
    L.append("")
    L.append(f"### {s}.1 技能主线总览 / Skill Thread Overview\n")
    L.append("🆕 = 新学 New · 🔁 = 巩固进阶 Reinforce（要求更高 higher standard） · 空白 = 不在本级 not at this level\n")
    L.append("| 代码 Code | 技能主线 Skill thread | L1 | L2 | L3 | L4 | L5 | L6 |\n|---|---|---|---|---|---|---|---|")
    for th in threads:
        first = min(th["lv"])
        cells = ["🆕" if n == first else ("🔁" if n in th["lv"] else "") for n in range(1, 7)]
        L.append(f'| {th["code"]} | {bi(th["name"])} | ' + " | ".join(cells) + " |")
    L.append("")
    for lvl in LEVELS:
        n = lvl["n"]
        here = [th for th in threads if n in th["lv"]]
        new = [th for th in here if min(th["lv"]) == n]
        rein = [th for th in here if min(th["lv"]) < n]
        lm = meta["levels"][f"L{n}"]
        if kids:
            badge = lvl["kd"] if fmt == "doubles" else lvl["ks"]
            age = f' · 建议 {lvl["age"]} 岁' if fmt == "singles" else ""
            L.append(f'### L{n} {lvl["e"]} {badge["zh"]} {badge["en"]}（{lvl["zh"][:2]} {lvl["en"]}{age}）\n')
        else:
            prof = lvl["dp"] if fmt == "doubles" else lvl["ap"]
            L.append(f'### L{n} {lvl["zh"][:2]} {lvl["en"]}（{prof["zh"]} {prof["en"]}）\n')
        if lm.get("goal"):
            L.append(f'**目标 Goal：** {lm["goal"]["zh"]}\n{lm["goal"]["en"]}\n')
        L.append(f"🆕 新学 New **{len(new)}** · 🔁 巩固进阶 Reinforce **{len(rein)}**\n")
        L.append("| 代码 Code | 技能 Skill | 类型 Type | 本级要求 This level | ⭐⭐⭐ 达标标准 Standard | 下一级预告 Next level |\n|---|---|---|---|---|---|")
        for th in new + rein:
            t = th["lv"][n]
            typ = "🆕 新学 New" if th in new else "🔁 巩固 Reinforce"
            nxt = th["lv"].get(n + 1)
            nxt_s = bi(nxt["t"]) if nxt else ("—" if n == 6 else "（本主线到此 thread ends here）")
            L.append(f'| {th["code"]}·L{n} | {bi(th["name"])} | {typ} | {bi(t["t"])} | {bi(t["m"])} | {nxt_s} |')
        L.append("")
        if lm.get("quest"):
            L.append(f'**闯关挑战 Quest：** {lm["quest"]["zh"]}\n{lm["quest"]["en"]}\n')
    return "\n".join(L)


def main():
    meta = json.loads((HERE / "levels_meta.json").read_text(encoding="utf-8"))
    data = {"levels": LEVELS, "domains": DOMAINS}
    for fmt, threads in (("singles", SINGLES), ("doubles", DOUBLES)):
        parts = []
        data[fmt] = {}
        for track in ("kids", "adults"):
            res = resolve(threads, track)
            parts.append(md_track(fmt, track, res, meta[fmt][track]))
            data[fmt][track] = {
                "notes": meta[fmt][track]["notes"],
                "levels": meta[fmt][track]["levels"],
                "threads": [{**t, "lv": {str(k): v for k, v in t["lv"].items()}} for t in res],
            }
        tpl = (HERE / f"{fmt}.template.md").read_text(encoding="utf-8")
        out = tpl.replace("<!-- TRACKS -->", "\n\n---\n\n".join(parts))
        (HERE / f"badminton-{fmt}-framework.md").write_text(out, encoding="utf-8")
        print(f"wrote badminton-{fmt}-framework.md")

    page = (HERE / "page.template.html").read_text(encoding="utf-8")
    blob = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    target = ROOT / "public" / "badminton" / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(page.replace("/*DATA*/", blob), encoding="utf-8", newline="\n")
    print(f"wrote {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
