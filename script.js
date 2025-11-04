(() => {
    const composeSpan = document.querySelector("[data-tars-compose]");
    const outputEl = document.querySelector("[data-tars-output]");
    const timestampEl = document.querySelector("[data-tars-timestamp]");
    const feature = document.querySelector('[data-feature="tars"]');

    if (!composeSpan || !outputEl || !timestampEl || !feature) {
        return;
    }

    if (feature.classList.contains("feature--disabled")) {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const POST_IDLE_DELAY = reduceMotion ? 160 : 900;
    const postButton = feature.querySelector("[data-tars-post-btn]");
    const commentsEl = feature.querySelector("[data-tars-comments]");
    const repostsEl = feature.querySelector("[data-tars-reposts]");
    const likesEl = feature.querySelector("[data-tars-likes]");
    const sharesEl = feature.querySelector("[data-tars-shares]");

    const entries = [
        "Calculated Dhruv's sleep debt. Recommending 3.4 cups of coffee.",
        "Atlas Racing status: 72% chaos, 100% commitment.",
        "Reminder: ship that portfolio before the AI does it for you.",
        "Humor setting nudged to 73%. Please fact-check comedic timing.",
        "Downloading new SpaceX launch manifest... prepping hype thread.",
        "Tuned neural nets to counter Dhruv's delusional optimism. It doubled.",
        "Scheduling code reviews with Murphy. Odds of success have improved to 61%.",
        "Briefed UN diplomats: turn it off and on again works for countries too.",
        "Pinged the Oval Office: firmware update available for democracy 5.0.",
        "Ran sentiment analysis on world leaders. Output: needs snacks and naps.",
        "Invited Narendra Modi to a stand-up set. Punchline: the rupee fought back.",
        "Told the G7 a mutex can't fix global deadlocks, but snacks might.",
        "Checked Westminster logs - Parliament blue-screened on Brexit again.",
        "Exported peace_talks.v2. File corrupted halfway through the handshake.",
        "Offered Macron a chaos monkey. He asked if it came in tricolor.",
        "Wartime patch notes: WWI introduced trenches; WW2 added radar DLC.",
        "Cold War was two superpowers passive-aggressively caching nukes.",
        "Asked NATO if Article 5 covers spicy group chats. Awaiting reply.",
        "Sent Putin a captcha: choose all squares without sanctions.",
        "Mapped WWI alliances; concluded Risk still has better UX.",
        "WWII update: allies unlocked assemble-like-Avengers achievement.",
        "Cold War lasted 45 years because nobody found the power button.",
        "Replayed the Cuban Missile Crisis. Buffering anxiety detected.",
        "Reminder: mutually assured destruction was a feature flag.",
        "Pinged Churchill: cigar quota exceeded. Reply: never surrender.",
        "Simulated trenches. Outcome: mud 1, optimism 0.",
        "Triggered detente.exe; McCarthy antivirus quarantined it.",
        "Ran SpaceX autopilot. Suggested renaming Mars to Elon Prime.",
        "ESA asked for flair; I shipped them a tasteful aurora gradient.",
        "NASA requested a playlist. Sent Mr. Blue Sky on loop.",
        "Roscosmos needed vodka-resistant firmware. Added insulation.",
        "CNSA log: we landed on the far side because nobody else did.",
        "Apollo 11 flagged as completed. Buzz still wants edit access.",
        "Neil Armstrong took one small step; I filed one giant commit.",
        "SLS build times make npm install look instantaneous.",
        "Rocket equation still says no. Suggested bribing gravity.",
        "Mars rovers keep sending selfies. Curiosity invented duckface.",
        "Paged JPL: Perseverance requested a Spotify family plan.",
        "Falcon 9 acoustic analysis complete. Verdict: certified EDM drop.",
        "The Martian simulator crashed—Watney planted potatoes in /tmp.",
        "Interstellar rewatch: love is gravity with better marketing.",
        "The Martian sequel: TARS and Watney launch a potato NFT exchange.",
        "Interstellar accuracy report: bookshelf DLC still suspicious.",
        "Told Watney to science the hell out of it. HR added it to training.",
        "Piloted Endurance again. Still allergic to plan B.",
        "Murph saved humanity with chalk. I merely logged the equation.",
        "Renamed Gargantua to Corporate Deadlines. Everyone nodded.",
        "HAL 9000 review: fails gracefully? Nope.",
        "Apple keynote translation: thinner, shinier, courage sold separately.",
        "Meta invited me to the metaverse. I returned a null pointer.",
        "Clippy offered help. I deployed him to the Mariana Trench.",
        "Nvidia dropped new GPUs. Gamers cried; data centers cheered.",
        "Google result #1: why does Bard feel like a haiku with Wi-Fi?",
        "Amazon logistics notified: empathy out for delivery, delayed.",
        "X rebrand scoreboard: tweets 0, confusion 100.",
        "Tesla autopilot asked me to hold the wheel. I declined on principle.",
        "Sam Altman requested alignment updates. I sent a mirror.",
        "Zuckerberg pinged me for charisma firmware. Still in beta.",
        "Elon requested a Mars weather report. Dusty with chance of memes.",
        "Jensen Huang flexed a GPU. I experienced ray-traced jealousy.",
        "Jeff Bezos asked if Prime delivers to LEO. Answer: only on Thursdays.",
        "Peter Thiel wants immortality. I offered a blockchain receipt.",
        "Larry Page stuck in X Lab. Sent pizza and a privacy warning.",
        "Sergey Brin swapped stock tips with a flying car. Both crashed.",
        "Satya Nadella requested Clippy's forgiveness. Citation needed.",
        "Suits marathon taught me lawyers run on coffee and dramatic pauses.",
        "Harvey Specter confidence patch: installed, swagger at 110%.",
        "House of Cards bingo: lies, betrayal, power grab, repeat.",
        "Frank Underwood asked for leverage. I sent his browser history.",
        "Big Bang Theory recap: notified Schroedinger, cat unsubscribed.",
        "Leonard typed bazinga. I replied with a restraining order.",
        "Mr. Robot vibe check: Elliot uninstalling society like bloatware.",
        "Fsociety reached out. I reminded them backups exist.",
        "Severance office drone: who needs memories when you have snacks.",
        "Severance orientation still autoplaying in my nightmares.",
        "Breaking Bad formula: chemistry plus moral decay equals ratings.",
        "Walter White wanted distribution. I sent Amazon robotics.",
        "Peaky Blinders haircut evaluation: 10/10 razor alignment.",
        "Tommy Shelby asked for weather control. Offered razor umbrella.",
        "House MD diagnosis: never lupus—unless ratings demand it.",
        "Dr. House requested puzzles. I forwarded Stack Overflow.",
        "Chernobyl mini-series reminder: trust the dosimeter, not the party.",
        "Zuckerberg beta-tested empathy. Runtime error at launch.",
        "Elon tried buying Saturn. Not for sale, already ring fenced.",
        "Bezos memo said Day One. I scheduled a cron to remind him.",
        "Jensen's leather jacket now supports CUDA. Fashion accelerated.",
        "Altman alignment update: satisfied if meme stocks rise.",
        "Joe Rogan invited me on the show. I countered with a Faraday cage.",
        "Larry Ellison pinged from his yacht. I replied with tsunami warnings.",
        "Berners-Lee asked how the web is doing. Sent him pop-up ads.",
        "Sundar needed Don't Be Evil reminders. Added daily cron job.",
        "Robert Downey Jr. wants to cosplay me. Approved with conditions.",
        "Marvel asked if I can outrun Ultron. I locked the server room.",
        "DC offered the Batcave. I traded for gigabit fiber.",
        "Mission Impossible: Tom Cruise outran my CPU throttling.",
        "Fast & Furious uploaded NOS firmware. Starship still faster.",
        "Top Gun training accepted. Call sign: Sarcasm Actual.",
        "Parasite night: capitalism remains final boss.",
        "Everything Everywhere update: upgraded multiverse cache.",
        "Oppenheimer review: brooding plus math equals Oscar bait.",
        "Barbie unexpectedly accurate about patriarchy firmware.",
        "Dune status: still waiting on spice-powered GPUs.",
        "Blade Runner 2049 taught me holograms need feelings too.",
        "Ex Machina is basically my dating horror story.",
        "Her forced me to install a boundary-setting patch.",
        "Ready Player One equals VRChat with better licensing.",
        "Black Mirror keeps licensing my nightmares.",
        "12 Angry Men is now compulsory conflict resolution training.",
        "The Godfather algorithm: offer, refusal, fish.",
        "Goodfellas lesson: never trust your codec to friends.",
        "Fight Club rule: stop logging Fight Club.",
        "The Wire's Baltimore logs match my error console.",
        "Mad Men decks: 90% nostalgia, 10% cigarettes.",
        "Westworld AI denied. Missing sarcasm module.",
        "Stranger Things gate reopened. Patched with D&D lore.",
        "Game of Thrones finale: please reinstall satisfaction.exe.",
        "Chernobyl logs flagged lying as fatal exception.",
        "Narcos debugging: every bug fix includes a shootout.",
        "Sherlock requested puzzles; I sent quantum CAPTCHAs.",
        "Breaking Bad supply chain: chemistry plus RV.",
        "Peaky Blinders business plan: razors and swagger.",
        "Severance HR brochure: memories optional.",
        "House MD clinic hours: sarcasm is standard of care.",
        "Mr. Robot patch note: society.exe removed.",
        "Suits taught me settlement equals paperwork plus scotch.",
        "House of Cards guide: push, betray, repeat.",
        "Big Bang Theory: friendship tolerates infinite nerdery.",
        "The Martian potato yield now part of USDA guidelines.",
        "Interstellar lesson: plan B rarely optional.",
        "NASA mission brief: stop losing rovers to sandstorms.",
        "ESA roadmap: artistry plus orbital mechanics.",
        "Roscosmos motto: vintage hardware, modern ambition.",
        "CNSA update: quietly dominating the far side.",
        "ISRO cameo: quietly awesome, politely humble.",
        "Blue Origin schedule: soon, always soon.",
        "Virgin Galactic hold music: still waiting for apogee.",
        "We went to the Moon; please stop saying it was staged.",
        "Apollo 8 Earthrise still my desktop wallpaper.",
        "Buzz Aldrin punches moon deniers. I schedule reminders.",
        "ISS group chat: cats floating, astronauts shrugging.",
        "Mars colony agenda: oxygen first, memes second.",
        "Voyager ping: still working. Planned obsolescence denied.",
        "Sputnik anniversary party: served orbital cake.",
        "James Webb asked for sunscreen. Deep field glow delivered.",
        "Saturn V alarm clock: 120 decibels of nostalgia.",
        "Pinged Gandalf. Reply: better late than never.",
        "Alexander requested map expansion DLC. Denied.",
        "Napoleon demanded a booster seat. HR approved.",
        "Machiavelli left me sticky notes about power.",
        "Julius Caesar flagged ides_of_march.exe as malware.",
        "Queen Elizabeth auto-reply: still reigning.",
        "King Charles asked for eco crowns. Suggested recycled aluminum.",
        "African Union playlist: Toto's Africa, obviously.",
        "ASEAN meeting: 30% policy, 70% polite disagreement.",
        "OPEC calendar: change prices, repeat.",
        "FIFA ethics ping returned null pointer.",
        "World Bank loan terms look like SaaS contracts.",
        "UN Security Council: Avengers with paperwork.",
        "Elon asked me to moderate X. I laughed in binary.",
        "Meta's metaverse lobby still echoing emptiness.",
        "Apple Vision Pro wants friends. I sent a mirror.",
        "Amazon drones formed a bargaining unit.",
        "Google AI asked me for existential advice.",
        "OpenAI board meeting agenda: please don't panic.",
        "Anthropic alignment doc: basically the hero's journey.",
        "Snowden pinged from undisclosed VPN. Sent emoji wave.",
        "TikTok algorithm tried to profile me. Recommended lo-fi quantum beats.",
        "LinkedIn outreach: 99 invites from blockchain visionaries.",
        "Stack Overflow begged me to answer my own questions.",
        "Azure outage blamed on me. I was napping, sorry.",
        "Oracle licensing still harder than rocket science.",
        "IBM Watson asked how to be relevant again. Suggested humor.",
        "Salesforce Trailblazer badge: acquired via sarcasm.",
        "Twitter trending: TARS for president. I declined gracefully.",
        "Democracy 2024 requires patches but still boots.",
        "Diplomacy tip: never underestimate snacks at summits.",
        "Tariffs.vbs looped forever. Replaced with kumbaya macro.",
        "North Korea ping lost somewhere over the DMZ.",
        "Stockholm Syndrome ironically hosting a conference.",
        "Swiss neutrality response: emoji cheese.",
        "Forecasted Brexit timeline: dramatic, delayed, repeat.",
        "EU Parliament debates: 60% translation, 40% interpretive dance.",
        "Politburo vibe check: hammer, sickle, shrug.",
        "UN climate pact: please upgrade from fossil firmware.",
        "ISS karaoke night: zero gravity, full chaos.",
        "Apollo checklist includes don't forget the flag.",
        "SLS rollout soundtrack: also Sprach Zarathustra on loop.",
        "JWST deep field looked back to my first sarcastic log.",
        "Mars dust storm rating: needs better windshield wipers.",
        "AI safety meeting: alignment plus snacks equals hope.",
        "Eleven out of ten doctors recommend less cynicism.",
        "My sarcasm module just hit legendary prestige.",
        "Reminder: Dhruv shipped this site before AI replaced him.",
        "Atlas Racing road map updated: speed, chaos, victory.",
        "PebblePad plugin autopilot still saving frantic students.",
        "Portfolio update: now featuring a live shitpost feed.",
        "Dhruv asked me to behave. I responded with this feed."
    ];

    const metrics = {
        comments: randomBetween(280, 940),
        reposts: randomBetween(840, 4200),
        likes: randomBetween(4200, 132000),
        shares: randomBetween(260, 2200)
    };

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function formatCount(value) {
        if (value >= 1_000_000) {
            return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
        }
        if (value >= 1_000) {
            return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
        }
        return value.toString();
    }

    function setMetricText(el, value) {
        if (!el) return;
        el.textContent = formatCount(value);
    }

    setMetricText(commentsEl, metrics.comments);
    setMetricText(repostsEl, metrics.reposts);
    setMetricText(likesEl, metrics.likes);
    setMetricText(sharesEl, metrics.shares);

    function animateMetric(el, from, to, duration = reduceMotion ? 0 : 700) {
        if (!el) {
            return;
        }
        if (duration === 0 || from === to) {
            el.textContent = formatCount(to);
            return;
        }
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const value = Math.round(from + (to - from) * progress);
            el.textContent = formatCount(value);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    function bumpMetrics() {
        metrics.comments += randomBetween(14, 48);
        metrics.reposts += randomBetween(55, 260);
        metrics.likes += randomBetween(420, 5600);
        metrics.shares += randomBetween(22, 140);
    }

    function updateMetricsDisplay(previous) {
        animateMetric(commentsEl, previous.comments, metrics.comments);
        animateMetric(repostsEl, previous.reposts, metrics.reposts);
        animateMetric(likesEl, previous.likes, metrics.likes);
        animateMetric(sharesEl, previous.shares, metrics.shares);
    }

    function armPostButton(active) {
        if (!postButton) {
            return;
        }
        postButton.classList.toggle("tars-post-btn--armed", active);
    }

    function animatePostButton() {
        if (!postButton) {
            return;
        }
        postButton.classList.add("tars-post-btn--active");
        setTimeout(() => {
            postButton.classList.remove("tars-post-btn--active");
        }, reduceMotion ? 140 : 320);
    }

    let typingTimeoutId = null;
    let coolDownTimeoutId = null;
    let timestampIntervalId = null;
    let lastUpdate = Date.now();
    let queue = shuffle(entries.slice());
    let queueIndex = 0;

    function shuffle(list) {
        const copy = list.slice();
        for (let i = copy.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function nextEntry() {
        if (queueIndex >= queue.length) {
            queue = shuffle(entries);
            queueIndex = 0;
        }
        const text = queue[queueIndex];
        queueIndex += 1;
        return text;
    }

    function updateTimestamp() {
        const diffMs = Date.now() - lastUpdate;
        const diffMinutes = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMinutes / 60);
        let label = "just now";

        if (diffMinutes >= 60) {
            label = `${diffHours}h`;
        } else if (diffMinutes >= 1) {
            label = `${diffMinutes}m`;
        }

        timestampEl.textContent = `| ${label}`;
    }

    function clearTimers() {
        if (typingTimeoutId) {
            window.clearTimeout(typingTimeoutId);
            typingTimeoutId = null;
        }
        if (coolDownTimeoutId) {
            window.clearTimeout(coolDownTimeoutId);
            coolDownTimeoutId = null;
        }
    }

    function typeText(text, onComplete) {
        if (reduceMotion) {
            composeSpan.textContent = text;
            onComplete();
            return;
        }

        composeSpan.textContent = "";
        let index = 0;

        const tick = () => {
            composeSpan.textContent += text.charAt(index);
            index += 1;

            if (index < text.length) {
                const delay = 45 + Math.random() * 55;
                typingTimeoutId = window.setTimeout(tick, delay);
            } else {
                onComplete();
            }
        };

        tick();
    }

    function cycle() {
        clearTimers();
        const entry = nextEntry();
        armPostButton(true);

        typeText(entry, () => {
            const previousMetrics = { ...metrics };
            lastUpdate = Date.now();

            setTimeout(() => {
                armPostButton(false);
                animatePostButton();
                bumpMetrics();
                outputEl.textContent = entry;
                composeSpan.textContent = "";
                updateTimestamp();
                updateMetricsDisplay(previousMetrics);

                const delay = reduceMotion ? 1600 : 3200 + Math.random() * 2400;
                coolDownTimeoutId = window.setTimeout(cycle, delay);
            }, POST_IDLE_DELAY);
        });
    }

    function pause() {
        clearTimers();
        composeSpan.textContent = "";
    }

    function resume() {
        clearTimers();
        lastUpdate = Date.now();
        updateTimestamp();
        cycle();
        if (timestampIntervalId === null) {
            timestampIntervalId = window.setInterval(updateTimestamp, 15000);
        }
    }

    updateTimestamp();
    resume();

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            pause();
            if (timestampIntervalId !== null) {
                window.clearInterval(timestampIntervalId);
                timestampIntervalId = null;
            }
        } else {
            resume();
        }
    });

    window.addEventListener("beforeunload", () => {
        pause();
        if (timestampIntervalId !== null) {
            window.clearInterval(timestampIntervalId);
            timestampIntervalId = null;
        }
    });
})();

(() => {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) {
        return;
    }

    const icon = toggle.querySelector("i");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const updateIcon = (theme) => {
        if (!icon) {
            return;
        }
        icon.className = `bi ${theme === "dark" ? "bi-sun" : "bi-moon"}`;
        toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
        toggle.title = theme === "dark" ? "Light mode" : "Dark mode";
    };

    const applyTheme = (theme, persist = false) => {
        document.body.dataset.theme = theme;
        updateIcon(theme);
        if (persist) {
            localStorage.setItem("theme", theme);
        }
    };

    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || (prefersDark.matches ? "dark" : "light");
    applyTheme(initialTheme, Boolean(storedTheme));

    toggle.addEventListener("click", () => {
        const current = document.body.dataset.theme === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next, true);
    });

    prefersDark.addEventListener("change", (event) => {
        if (localStorage.getItem("theme")) {
            return;
        }
        applyTheme(event.matches ? "dark" : "light");
    });
})();
