//  uses the same naming scheme like how google uses it in theirs, eg they use stuff like -gb-dark
export const bookViewClassToAdd = "-gb-sepia";
export const localKey = "-gb-sepia-enabled";
export const ToggleSelector =
  'button.mdc-switch,.mdc-switch,[role="switch"],input[type="checkbox"]';
export const sepiaRowId = "-gb-sepia-row";

export const invertClass = "-gb-invert";
export const invertKey = "invert-colors-enabled";

//  CSS for book view/ sepia view
export const mainCSS = `
:root {
  --gb-paper: #F4ECD8;
  --gb-page-edge: rgba(110,90,62,.60);
  --gb-page-shade: rgba(70,50,26,.62);
  --gb-page-fade: rgba(70,50,26,.45);
  --gb-page-radius: 8px;
}

html body.${bookViewClassToAdd}[class~="-gb-dark"] [class~="-gb-text"],
html body.${bookViewClassToAdd}[class~="-gb-dark"] [class~="-gb-text"] img,
html body.${bookViewClassToAdd}[class~="-gb-dark"] [class~="-gb-text"] svg,
html body.${bookViewClassToAdd}[class~="-gb-dark"] [class~="-gb-text"] iframe {
  filter: none !important;
}

html body.${bookViewClassToAdd} reader-horizontal-view li.twopage {
  background: transparent !important;
  position: relative !important;
}

html body.${bookViewClassToAdd} reader-page {
  background: var(--gb-paper) !important;
}

html body.${bookViewClassToAdd} reader-page.shown {
  box-shadow:
    inset 26px 0 30px -22px var(--gb-page-shade),
    inset -26px 0 30px -22px var(--gb-page-shade),
    inset 0 18px 24px -18px var(--gb-page-fade),
    inset 0 -18px 24px -18px var(--gb-page-fade) !important;
}

html body.${bookViewClassToAdd} li.twopage reader-page.odd.shown {
  box-shadow:
    inset -1px 0 0 0 var(--gb-page-edge),
    inset 26px 0 30px -22px var(--gb-page-shade),
    inset 0 18px 24px -18px var(--gb-page-fade),
    inset 0 -18px 24px -18px var(--gb-page-fade) !important;
}

html body.${bookViewClassToAdd} li.twopage reader-page.even.shown {
  box-shadow:
    inset 1px 0 0 0 var(--gb-page-edge),
    inset -26px 0 30px -22px var(--gb-page-shade),
    inset 0 18px 24px -18px var(--gb-page-fade),
    inset 0 -18px 24px -18px var(--gb-page-fade) !important;
}

html body.${bookViewClassToAdd} reader-page.shown {
  border-radius: var(--gb-page-radius) !important;
}

html body.${bookViewClassToAdd} li.twopage reader-page.odd.shown {
  border-radius: var(--gb-page-radius) 0 0 var(--gb-page-radius) !important;
}

html body.${bookViewClassToAdd} li.twopage reader-page.even.shown {
  border-radius: 0 var(--gb-page-radius) var(--gb-page-radius) 0 !important;
}

html body.${bookViewClassToAdd} div.gb-page-shadow {
  display: none !important;
}

html body.${bookViewClassToAdd} reader-horizontal-view li.twopage::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: min(6%, 110px);
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 6;
  background: linear-gradient(to right,
    rgba(60,46,30,0) 0%,
    rgba(90,72,48,.10) 26%,
    rgba(70,55,36,.30) 44%,
    rgba(30,23,14,.55) 50%,
    rgba(70,55,36,.30) 56%,
    rgba(90,72,48,.10) 74%,
    rgba(60,46,30,0) 100%);
}

html body.${bookViewClassToAdd} reader-horizontal-view ol {
  perspective: 2400px;
  transform-style: preserve-3d;
}

html body.${bookViewClassToAdd} reader-page {
  transition: transform .45s cubic-bezier(.25,.8,.35,1), opacity .45s ease;
  transform-origin: left center;
  backface-visibility: hidden;
}

#${sepiaRowId} {
  margin: 24px 0 !important;
}
`;

//  invert stuff
export const invertCSS = `
body.${invertClass} reader-page.shown reader-rendered-page > div.gb-segment > div:nth-child(2) {
  filter: invert(1) !important;
}
`;

//  margin stuff

export const marginCSS = `
html body reader-page > reader-rendered-page,
html body reader-page > .selection-catcher,
html body reader-page > .text-layer-placeholder,
html body reader-page > reader-page-overlay,
html body reader-page > reader-icon-overlay {
  transform: scale(var(--gb-page-scale, 1)) !important;
  transform-origin: center center !important;
}
`;

export const marginLocalKey = "gb-margin-value";
export const marginRowId = "-gb-margin-row";
export const marginLabelId = "-gb-margin-label";
export const maxMargins = 30;
export const marginStep = 2;

export const decreaseLineHeightSVG = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.67 4v6.893l-2.12-2.12-1.88 1.894L8.003 16 2.67 21.333l1.88 1.88 2.12-2.106V28h2.667v-6.893l2.12 2.12 1.88-1.894L8.003 16l5.334-5.333-1.88-1.88-2.12 2.106V4H6.67zm22.667 8H14.67V9.333h14.667V12zM14.67 17.333h14.667v-2.666H14.67v2.666zm14.667 5.334H14.67V20h14.667v2.667z" fill="currentColor"></path></svg>`;

export const increaseLineHeightSVG = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.004 10.767V22.14l2.12-2.155 1.88 1.923-5.334 5.455-5.333-5.455 1.88-1.936 2.12 2.168V10.767l-2.12 2.155-1.88-1.923L8.67 5.545l5.334 5.454-1.88 1.936-2.12-2.168zm20-1.131V6.908H15.337v2.728h14.667zm0 8.181H15.337V15.09h14.667v2.727zM15.337 26h14.667v-2.727H15.337v2.727z" fill="currentColor"></path></svg>`;
