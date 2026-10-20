// The one file to change when a domain goes live or a store page opens.
// state: "soon" (no store page yet: the button shows 곧 출시 and links nowhere), "preorder" or "live".
// appStore.pt is App Store Connect's provider token (Analytics > Campaigns); with it, every App Store
// link carries ct=site-<app>-<spot> so App Store Connect counts what each spot of the site converts.
window.SITE_LINKS = {
  cardkkang: {
    site: "https://summerriversound.github.io/cardkkang/",
    appStore: { id: "6822955757", state: "soon", pt: null },
  },
  feathernote: {
    site: "https://summerriversound.github.io/feather-note/",
    appStore: { id: "6822205220", state: "soon", pt: null },
    play: { id: "com.feathernote.app", state: "soon" },
  },
};
