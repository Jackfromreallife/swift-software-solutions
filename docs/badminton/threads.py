"""Skill threads for the badminton pathway.

A skill thread is one skill that runs across several levels. Each level it
appears in has its own target (t) and its own ⭐⭐⭐ "Consistent" standard (m).
The first level a thread appears in a track is a NEW skill there; every later
level is a REINFORCE skill with a higher standard.

Edit this file, then run:  python docs/badminton/build.py
"""


def T(zh, en, mzh, men):
    """One level of a thread: target (zh/en) + ⭐⭐⭐ standard (zh/en)."""
    return {"t": {"zh": zh, "en": en}, "m": {"zh": mzh, "en": men}}


def thread(code, dom, zh, en, levels, kids=None, adults=None):
    """kids / adults: per-level overrides. A value of None removes that level from the track."""
    return {"code": code, "dom": dom, "name": {"zh": zh, "en": en},
            "levels": levels, "kids": kids or {}, "adults": adults or {}}


# --------------------------------------------------------------------------- singles

SINGLES = [
    thread("G01", "G", "握拍与拍面控制", "Grip & racket-face control", {
        1: T("正手握拍（握手式）", "Forehand 'handshake' grip", "自己握对，击球中保持", "Self-corrects and holds it while hitting"),
        2: T("正反手握拍及转换", "Forehand & backhand grip with switching", "对打中自动转换 7/10", "Switches automatically in rallies 7/10"),
        3: T("放松握拍、击球瞬间发力；网前手指控制", "Relaxed grip, tighten at impact; finger control at the net", "教练观察 7/10 球动作正确", "Coach sees correct grip use on 7/10 shots"),
        4: T("快速换握应对追身与平抽", "Fast grip changes for body shots and drives", "平抽对抗中换握不失误 7/10", "Clean grip changes in drive drills 7/10"),
    }, adults={1: T("正手与反手握拍", "Forehand & backhand grip", "自己握对，击球中保持", "Self-corrects and holds it while hitting")}),

    thread("F01", "F", "准备、启动与回位", "Ready, split step & recovery", {
        1: T("每球前做好准备姿势", "Ready position before every shot", "每球前主动做", "Does it before every shot, unprompted"),
        2: T("击球后回到中心位", "Recover to base after each shot", "对打中回位 7/10", "Recovers to base on 7/10 shots in rallies"),
        3: T("对方击球瞬间做启动步", "Split step as the opponent hits", "对打中启动 7/10", "Split step on 7/10 shots in rallies"),
        4: T("根据来球预判调整回位点", "Adjust base position by anticipation", "多球中预判回位 7/10", "Anticipatory recovery on 7/10 in multi-feed"),
        5: T("提前启动、主动抢点", "Early start to take the shuttle early", "对抗中抢点 7/10", "Takes it early on 7/10 in pressure drills"),
        6: T("比赛节奏下回位无空档", "No gaps in recovery at match tempo", "比赛中观察确认", "Confirmed in match observation"),
    }),

    thread("F02", "F", "全场步法", "Court movement footwork", {
        1: T("侧滑步与前后小步移动", "Side shuffle and small forward/back steps", "6 米往返流畅、不交叉脚", "Fluent over 6m, no foot crossing"),
        2: T("前后移动：上网一步、后退并步", "Forward to net and chassé back", "无球往返 5 次流畅", "5 fluent shadow reps"),
        3: T("正手后场后退步法到位击球", "Forehand rear-court footwork into hitting position", "多球 10 球步法正确", "Correct footwork on 10 multi-feed shuttles"),
        4: T("四方步法，含头顶区与反手区", "4-corner footwork incl. round-the-head and backhand corner", "多球 20 球不乱", "20 multi-feed shuttles without breakdown"),
        5: T("起跳 / 剪刀步击球与突击步", "Jump, scissor-kick and attacking footwork", "落地平衡并回位 7/10", "Balanced landing and recovery 7/10"),
        6: T("全场高速移动与被动救球恢复", "Full-court speed and recovery from deep pressure", "多球 40 球质量保持", "40 multi-feed shuttles, quality kept"),
    }),

    thread("F03", "F", "网前步法", "Net footwork", {
        2: T("上网两步 / 三步", "2–3 step net approach", "无球动作正确", "Correct in shadow"),
        3: T("网前蹬跨步，膝对脚尖", "Net lunge with knee over toes", "多球 10 球姿势正确、回位快", "Correct and quick recovery on 10 shuttles"),
        4: T("四方移动中上网与快速回位", "Net approach and fast recovery inside 4-corner movement", "多球中 7/10 到位", "In position 7/10 in multi-feed"),
        5: T("低重心远距离蹬跨保持平衡", "Long, low lunge with balance under pressure", "对抗中 7/10 平衡", "Balanced on 7/10 in pressure drills"),
        6: T("爆发蹬地与网前抢点", "Explosive push-off to take the net early", "比赛中主导网前", "Dominates the net in matches"),
    }, kids={2: T("上网一步，伸拍够球", "One-step approach and reach to the net", "无球动作正确", "Correct in shadow")}),

    thread("S01", "S", "发球", "Serve", {
        1: T("下手发球过网", "Underarm serve over the net", "过网 7/10", "Over the net 7/10"),
        2: T("正手高远发球到后场", "Forehand high serve to the rear court", "落后场 6/10", "Lands in rear court 6/10"),
        3: T("高远发球落底线区；反手网前发球入门", "High serve to the back zone; intro backhand low serve", "高远 7/10 落区，网前 5/10", "High serve 7/10 in zone, low serve 5/10"),
        4: T("网前发球低而贴网，落点变化", "Tight low serve with varied placement", "指定落点 7/10", "To target spot 7/10"),
        5: T("平高球偷袭，动作隐蔽", "Disguised flick serve as a surprise", "隐蔽成功 6/10", "Disguised and effective 6/10"),
        6: T("按对手站位与比分选择发球", "Serve choice by opponent stance and score", "比赛中观察确认", "Confirmed in match observation"),
    }, adults={1: T("正手发高球过网", "Forehand high serve over the net", "过中线 6/10", "Past mid-court 6/10")}),

    thread("S02", "S", "接发球", "Return of serve", {
        2: T("接高远发球回到后场", "Return a high serve to the rear court", "回到后场 6/10", "Back to rear court 6/10"),
        3: T("接发高球：高远或吊球两种回法", "Return high serve with a clear or a drop", "回球到位 7/10", "Quality return 7/10"),
        4: T("接网前发球：推、放、挑三条线路", "Return low serve: push, net or lift", "三线路到位 7/10", "On target 7/10 across all three"),
        5: T("接发主动抢攻", "Attack weak serves on return", "抢攻 7/10", "Attacks 7/10 of weak serves"),
        6: T("预判对手发球习惯", "Read the server's patterns", "比赛中观察确认", "Confirmed in match observation"),
    }),

    thread("R01", "R", "正手高远球", "Forehand clear", {
        1: T("抛球 / 喂球下原地击球过网", "Static hit over the net from a hand-feed", "过网 7/10", "Over the net 7/10"),
        2: T("原地击高远到后场", "Static clear to the rear court", "过后发球线 6/10", "Past long service line 6/10"),
        3: T("移动后击高远到后场 1/3", "Clear to the rear third after moving", "落后场 1/3 7/10", "Rear third 7/10"),
        4: T("四方移动中打直线与对角高远", "Straight and cross-court clears during 4-corner movement", "直线、对角各 7/10", "7/10 each, straight and cross"),
        5: T("防守高远与进攻平高（含头顶）", "Defensive high clear and flat attacking clear, incl. round-the-head", "压力下 7/10 到位", "7/10 on target under pressure"),
        6: T("动作一致隐蔽，比赛节奏下起跳击球", "Disguised, same action as drop/smash, jumping at match tempo", "比赛中造成对手误判", "Wrong-foots opponents in matches"),
    }, kids={1: T("过肩抛掷动作 → 抛球击打过网", "Overarm throw action → hit a tossed shuttle over", "过网 7/10", "Over the net 7/10")}),

    thread("R02", "R", "吊球", "Drop shot", {
        3: T("正手吊球落前场", "Forehand drop to the front court", "落前场且不高 7/10", "Front court and tight 7/10"),
        4: T("吊直线 / 对角，与高远同动作", "Straight and cross drops with the clear's action", "7/10 到位", "On target 7/10"),
        5: T("劈吊 / 滑板吊，有角度", "Slice and reverse-slice drops with angle", "有角度 7/10", "Angled 7/10"),
        6: T("假动作与节奏变化的吊球", "Drops with deception and tempo change", "比赛中 6/10 有效", "Effective 6/10 in matches"),
    }),

    thread("R03", "R", "杀球", "Smash", {
        3: T("杀球入门：向下击球", "Intro smash: hit downward", "向下且入界 7/10", "Downward and in 7/10"),
        4: T("正手杀球线路可控，杀后上网", "Controlled forehand smash, then follow in", "线路可控 7/10", "Controlled placement 7/10"),
        5: T("杀直线 / 对角 / 点杀", "Straight, cross and stick smash", "线路 7/10", "Placement 7/10"),
        6: T("起跳杀与杀—上网—扑连续进攻", "Jump smash and smash–net–kill sequence", "多球 8/10 连贯", "8/10 fluent in multi-feed"),
    }, kids={3: T("杀球动作入门（不追求力量）", "Intro smash action (no power focus)", "向下且入界 6/10", "Downward and in 6/10")}),

    thread("R04", "R", "头顶与反手后场", "Round-the-head & backhand rear court", {
        4: T("头顶高远 / 吊球；反手高远过渡", "Round-the-head clear and drop; transitional backhand clear", "头顶 7/10，反手过中线 6/10", "Round-the-head 7/10, backhand past mid-court 6/10"),
        5: T("反手吊球与反手高远到底线", "Backhand drop and full-length backhand clear", "7/10 到位", "On target 7/10"),
        6: T("被动反手区处理：反手劈吊、头顶劈杀", "Deep backhand-corner options: backhand slice, round-the-head slice smash", "比赛中被动转主动", "Turns pressure around in matches"),
    }),

    thread("M01", "M", "接杀与中场防守", "Smash defence & mid court", {
        3: T("接杀挡网入门", "Intro block against a smash", "挡过网 6/10", "Blocks over the net 6/10"),
        4: T("接杀挡网 / 抽挡", "Block and drive against smashes", "挡到网前 7/10", "Blocks to the net 7/10"),
        5: T("接杀反抽 / 挑底线", "Counter-drive and deep lift from defence", "7/10 到位", "On target 7/10"),
        6: T("全场防守，接杀回到后场", "Full-court defence, smash returns to rear court", "8/10 到后场", "8/10 to rear court"),
    }),

    thread("N01", "N", "放网与搓球", "Net shot & spin", {
        2: T("手抛网前放网", "Net shot from a hand-feed", "落前发球线内 6/10", "Inside short service line 6/10"),
        3: T("移动后放网；搓球入门", "Net shot after moving; intro spin net", "贴网 7/10", "Tight to net 7/10"),
        4: T("搓球贴网，制造机会", "Tight spin net to create chances", "贴网 7/10（对练中）", "Tight 7/10 in drills"),
        5: T("网前假动作：停顿、勾对角", "Net deception: hold and cross-net", "对练中 6/10 有效", "Effective 6/10 in drills"),
        6: T("网前细腻组合，主导网前", "Fine net combinations to dominate the net", "8/10 到位", "On target 8/10"),
    }),

    thread("N02", "N", "挑球、推球与扑球", "Lift, push & net kill", {
        1: T("下手挑球", "Underarm lift", "过中线 6/10", "Past mid-court 6/10"),
        2: T("网前挑球到后场", "Lift from the net to the rear court", "到后场 6/10", "Rear court 6/10"),
        3: T("移动中挑到底线 1/3", "Lift to the rear third while moving", "落后场 1/3 7/10", "Rear third 7/10"),
        4: T("推后场与勾对角", "Push to the rear and cross-net", "7/10 到位", "On target 7/10"),
        5: T("网前扑球；被动时高质量挑底线", "Net kill; deep lift under pressure", "扑球不触网 7/10", "Kills without net touch 7/10"),
        6: T("网前快速推扑，抓住机会", "Fast push and kill to seize chances", "比赛中抓住机会", "Seizes chances in matches"),
    }, kids={1: None}),

    thread("T01", "T", "单打战术", "Singles tactics", {
        2: T("有意识打到对方空位", "Hit away from the opponent", "对练中能做到", "Does it in drills"),
        3: T("打四角调动对手", "Move the opponent to all four corners", "对练中 7/10", "7/10 in rally drills"),
        4: T("拉吊结合、攻防转换", "Clear–drop combinations, attack-defence switches", "对练中有效", "Effective in drills"),
        5: T("控制与压迫；观察对手弱点", "Control and pressure; read the opponent's weakness", "局间能调整", "Adjusts between games"),
        6: T("赛前计划与视频复盘", "Game plan and video review", "执行计划并复盘", "Executes the plan and reviews it"),
    }),

    thread("P01", "P", "体能", "Physical", {
        1: T("手眼协调：颠球与抛接", "Hand-eye coordination: keep-ups and catching", "颠球 10 次，抛接 7/10", "10 keep-ups, catches 7/10"),
        2: T("灵敏协调：侧滑步、十字跳", "Agility: side shuffle, cross jumps", "达到年龄常模", "Meets age norm"),
        3: T("六点步法计时", "6-point footwork test", "两轮 < 38 秒", "< 38s for 2 rounds"),
        4: T("多球耐力", "Multi-feed endurance", "30 球质量保持", "30 shuttles, quality kept"),
        5: T("专项速度与核心", "Speed and core strength", "达到年龄常模", "Meets age norm"),
        6: T("周期化体能", "Periodised fitness", "测试持续提高", "Test scores keep improving"),
    }, adults={
        1: T("热身与放松流程", "Warm-up and cool-down routine", "每次课自己完成", "Does it independently every session"),
        2: None,
        3: T("六点步法计时", "6-point footwork test", "两轮 < 32 秒", "< 32s for 2 rounds"),
        4: T("多球耐力", "Multi-feed endurance", "40 球质量保持", "40 shuttles, quality kept"),
        5: T("专项体能：间歇、核心、力量", "Interval, core and strength work", "按计划完成 8 周", "Follows the plan for 8 weeks"),
    }),

    thread("X01", "X", "规则、心理与礼仪", "Rules, mindset & etiquette", {
        1: T("球场礼仪：打招呼、捡球", "Court etiquette: greet, collect shuttles", "每次主动做", "Always, unprompted"),
        2: T("单打场地线与界内外", "Singles court lines, in and out", "判断准确", "Calls accurately"),
        3: T("21 分制计分，能当裁判", "21-point scoring, can umpire", "比赛中计分无错", "Error-free scoring in matches"),
        4: T("赛前热身与情绪控制", "Pre-match warm-up and emotional control", "落后时保持稳定", "Stays calm when behind"),
        5: T("关键分的心理程序", "Routine for pressure points", "关键分使用程序", "Uses the routine on key points"),
        6: T("自我管理：饮食、睡眠、伤病预防", "Self-management: food, sleep, injury prevention", "习惯化并有记录", "Habitual and logged"),
    }, adults={1: None, 2: T("单打规则与发球站位", "Singles rules and serving positions", "无错误", "Error-free")}),
]

# --------------------------------------------------------------------------- doubles

DOUBLES = [
    thread("DS1", "DS", "双打发球", "Doubles serve", {
        1: T("网前发球过网（正 / 反手）", "Low serve over the net (forehand or backhand)", "落区 5/10", "In zone 5/10"),
        2: T("网前发球低且落区", "Low serve, tight and in zone", "落区 6/10", "In zone 6/10"),
        3: T("反手网前发球", "Backhand low serve", "低且落区 7/10", "Low and in zone 7/10"),
        4: T("网前发球与平高球混用", "Mix low and flick serves", "平高球 6/10 有效", "Flick effective 6/10"),
        5: T("落点变化（中线 / 边线）与平快球", "Varied placement (T / wide) and drive serve", "指定落点 7/10", "To target spot 7/10"),
        6: T("按对手与比分设计发球", "Serve plan by opponent and score", "比赛中观察确认", "Confirmed in match observation"),
    }, kids={1: None}),

    thread("DR1", "DR", "双打接发球", "Doubles return of serve", {
        2: T("接发不起高", "Return without lifting", "不起高 5/10", "Not lifted 5/10"),
        3: T("接发推后场 / 放网", "Return with a push or net shot", "7/10 到位", "On target 7/10"),
        4: T("接发抢攻：扑、推中路", "Attacking return: kill or push to the middle", "抢攻 7/10", "Attacks 7/10"),
        5: T("接发前三拍套路", "First-3-shot return plays", "能执行 2 套", "Executes 2 plays"),
        6: T("预判抢网", "Anticipate and take the net early", "比赛中观察确认", "Confirmed in match observation"),
    }),

    thread("DD1", "DD", "平抽挡", "Drive & flat game", {
        1: T("两人合作连续击球", "Cooperative rally with a partner", "连续 10 拍", "10-shot rally"),
        2: T("半场平抽入门", "Intro mid-court drive", "平抽连续 6 拍", "6-shot drive rally"),
        3: T("平抽与快挡", "Drives and fast blocks", "连续 10 拍", "10-shot rally"),
        4: T("快速平抽对抗", "Fast drive battles", "连续 15 拍", "15-shot rally"),
        5: T("平抽中变线与下压", "Change direction and hit down in drive exchanges", "7/10 有效", "Effective 7/10"),
        6: T("高速平抽主导", "Dominate fast flat exchanges", "比赛中赢得平抽", "Wins drive battles in matches"),
    }, adults={1: T("半场对打不起高", "Mid-court rally without lifting", "连续 10 拍", "10-shot rally")}),

    thread("DA1", "DA", "后场进攻", "Rear attack", {
        3: T("后场杀球与跟进", "Smash and follow in", "下压 7/10", "Downward 7/10"),
        4: T("连续杀球 3–5 拍", "3–5 smashes in a row", "7/10 下压", "Downward 7/10"),
        5: T("点杀、劈杀与线路变化", "Stick smash, slice smash, varied placement", "线路 7/10", "Placement 7/10"),
        6: T("杀—封—扑连续进攻组合", "Smash–intercept–kill chain", "多球 8/10 连贯", "8/10 fluent in multi-feed"),
    }),

    thread("DN1", "DN", "前场封网", "Front-court interception", {
        3: T("网前封网下压", "Intercept at the net and hit down", "下压 7/10", "Downward 7/10"),
        4: T("封网与扑球，抓住机会", "Intercept and kill when the chance comes", "7/10", "7/10"),
        5: T("前场压网与快速推扑", "Net pressure with fast push and kill", "7/10", "7/10"),
        6: T("网前主导与拦截假动作", "Dominate the net with deceptive interceptions", "比赛中主导网前", "Dominates the net in matches"),
    }),

    thread("DF1", "DF", "双打防守", "Doubles defence", {
        3: T("接杀挡网 / 挑底线", "Block or deep lift against smashes", "6/10 到位", "On target 6/10"),
        4: T("防守反抽", "Counter-drive from defence", "7/10", "7/10"),
        5: T("防守转攻：反抽、挑底线到位", "Defence to attack: counters and deep lifts", "7/10 到位", "On target 7/10"),
        6: T("接连续杀并从防守中得分", "Survive repeated smashes and win points from defence", "接连续杀 8/10", "Repeated smash defence 8/10"),
    }),

    thread("DP1", "DP", "站位与轮转", "Formation & rotation", {
        1: T("发球 / 接发站位", "Serving and receiving positions", "每次站对", "Correct every time"),
        2: T("进攻前后、防守左右的概念", "Front-back to attack, side-by-side to defend", "喂球中站对 7/10", "Correct with feed 7/10"),
        3: T("对练中保持前后 / 左右站位", "Hold front-back and side-by-side in drills", "对练中 7/10", "7/10 in drills"),
        4: T("攻守转换与轮转", "Attack-defence switches and rotation", "对练中无空档 7/10", "No gaps 7/10 in drills"),
        5: T("前后场分工明确", "Clear front and rear roles", "比赛中分工清楚", "Clear roles in matches"),
        6: T("高速轮转无空档", "High-speed rotation with no gaps", "多球 8/10 不乱", "8/10 clean in multi-feed"),
    }, kids={1: T("两人轮流击球", "Taking turns with a partner", "连续 5 轮不乱", "5 clean turns")}),

    thread("DC1", "DC", "沟通与配合", "Communication & partnership", {
        1: T("喊口令：我的 / 你的", "Call 'Mine / Yours'", "每球都喊", "Calls every shuttle"),
        2: T("中路球分工（正手位接）", "Middle shuttle: forehand side takes it", "7/10 正确", "Correct 7/10"),
        3: T("失误后互相鼓励", "Encourage each other after errors", "每次都做", "Every time"),
        4: T("口令、手势与发球暗号", "Calls, hand signals and serve signals", "每分都有", "Every point"),
        5: T("关键分的沟通程序", "Communication routine on key points", "关键分稳定", "Steady on key points"),
        6: T("组合目标与复盘", "Pair goals and joint review", "有记录并执行", "Logged and followed"),
    }),

    thread("DT1", "DT", "双打战术", "Doubles tactics", {
        3: T("主动下压，不轻易起高球", "Keep it down, avoid needless lifts", "对练中 7/10", "7/10 in drills"),
        4: T("打中路、打追身", "Hit the middle and the body", "7/10 有效", "Effective 7/10"),
        5: T("针对弱者 / 弱点；前三拍套路", "Target the weaker player; first-3-shot plays", "局间能调整", "Adjusts between games"),
        6: T("赛前计划与视频复盘", "Game plan and video review", "执行计划并复盘", "Executes the plan and reviews it"),
    }),

    thread("DX1", "DX", "规则与组合心理", "Rules & pair mindset", {
        1: T("双打场地与发球区", "Doubles court and service courts", "能指出", "Can point them out"),
        2: T("双打计分与发球轮换", "Doubles scoring and service order", "能说清", "Can explain it"),
        3: T("独立计分、能当裁判", "Self-scores and can umpire", "比赛中无错误", "Error-free in matches"),
        4: T("比赛节奏与心态", "Match tempo and mindset", "逆境中稳定", "Steady when behind"),
        5: T("组合关键分心理", "Pair mindset on key points", "有固定程序", "Has a routine"),
        6: T("赛事与组合管理", "Event and pair management", "习惯化", "Habitual"),
    }, kids={1: T("合作礼仪：击掌鼓励", "Partner etiquette: high-five and encourage", "每次主动做", "Always, unprompted")}),

    thread("DM1", "DM", "混双（可选）", "Mixed doubles (optional)", {
        5: T("混双前后场分工与站位", "Mixed doubles roles and positions", "每次站对", "Correct every time"),
        6: T("混双攻防体系", "Mixed doubles attack and defence system", "比赛中执行", "Executes in matches"),
    }, kids={5: None, 6: None}),
]
