// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="01_intro.html"><strong aria-hidden="true">1.</strong> Start Rolling: Why Momentum Beats Motivation</a></li><li class="chapter-item expanded "><a href="02_momentum-model.html"><strong aria-hidden="true">2.</strong> The Physics of Progress</a></li><li class="chapter-item expanded "><a href="03_core-metrics.html"><strong aria-hidden="true">3.</strong> Three Numbers That Tell the Truth</a></li><li class="chapter-item expanded "><a href="04_map-to-tenk6.html"><strong aria-hidden="true">4.</strong> Loops Meet Hacks</a></li><li class="chapter-item expanded "><a href="05_scope-slicing.html"><strong aria-hidden="true">5.</strong> Slice ‘Til You Smile</a></li><li class="chapter-item expanded "><a href="06_activation-priming.html"><strong aria-hidden="true">6.</strong> Lower the Launch Pad</a></li><li class="chapter-item expanded "><a href="07_red-button.html"><strong aria-hidden="true">7.</strong> Ship Ugly, Stay Alive</a></li><li class="chapter-item expanded "><a href="08_timeboxing.html"><strong aria-hidden="true">8.</strong> Sand Timers for Sanity</a></li><li class="chapter-item expanded "><a href="09_context-guardrails.html"><strong aria-hidden="true">9.</strong> Stay in Your Lane</a></li><li class="chapter-item expanded "><a href="10_energy-ladders.html"><strong aria-hidden="true">10.</strong> Match the Mood, Move the Work</a></li><li class="chapter-item expanded "><a href="11_public-commit.html"><strong aria-hidden="true">11.</strong> Tweet It, Then Sweat It</a></li><li class="chapter-item expanded "><a href="12_user-contact.html"><strong aria-hidden="true">12.</strong> Ask 3 or It Didn’t Happen</a></li><li class="chapter-item expanded "><a href="13_evidence-system.html"><strong aria-hidden="true">13.</strong> Museum of Proof</a></li><li class="chapter-item expanded "><a href="14_daily-proof.html"><strong aria-hidden="true">14.</strong> One Pixel a Day</a></li><li class="chapter-item expanded "><a href="15_kill-rules.html"><strong aria-hidden="true">15.</strong> Mercy Kills Save Time</a></li><li class="chapter-item expanded "><a href="16_weekly-sweep.html"><strong aria-hidden="true">16.</strong> Marie Kondo Your Backlog</a></li><li class="chapter-item expanded "><a href="17_retro-in-5.html"><strong aria-hidden="true">17.</strong> Post-Mortem Espresso Shot</a></li><li class="chapter-item expanded "><a href="18_next-pick.html"><strong aria-hidden="true">18.</strong> Flip a Coin (But Smarter)</a></li><li class="chapter-item expanded "><a href="19_daily-protocol.html"><strong aria-hidden="true">19.</strong> Your Indie Operating System</a></li><li class="chapter-item expanded "><a href="20_weekly-protocol.html"><strong aria-hidden="true">20.</strong> Sunday Scoreboard</a></li><li class="chapter-item expanded "><a href="21_momentum-audit.html"><strong aria-hidden="true">21.</strong> Find the Leak, Patch the Loop</a></li><li class="chapter-item expanded "><a href="22_low-energy-playbook.html"><strong aria-hidden="true">22.</strong> Momentum on the Couch</a></li><li class="chapter-item expanded "><a href="23_rejection-playbook.html"><strong aria-hidden="true">23.</strong> Make “No” Your Fuel</a></li><li class="chapter-item expanded "><a href="24_silent-week-playbook.html"><strong aria-hidden="true">24.</strong> The Desert of Nothingness</a></li><li class="chapter-item expanded "><a href="25_stack-design.html"><strong aria-hidden="true">25.</strong> Hack Sandwiches</a></li><li class="chapter-item expanded "><a href="26_habit-formation.html"><strong aria-hidden="true">26.</strong> Make It Reflex, Not Effort</a></li><li class="chapter-item expanded "><a href="27_collab-mode.html"><strong aria-hidden="true">27.</strong> Momentum in Multiplayer</a></li><li class="chapter-item expanded "><a href="28_tools-templates.html"><strong aria-hidden="true">28.</strong> Minimal Toolchain, Max Push</a></li><li class="chapter-item expanded "><a href="29_checklists.html"><strong aria-hidden="true">29.</strong> Pocket Cheats for Not Stalling</a></li><li class="chapter-item expanded "><a href="30_30day-challenge.html"><strong aria-hidden="true">30.</strong> Thirty Days of Not Quitting</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
