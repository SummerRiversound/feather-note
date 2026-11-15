// The one file to change when a domain goes live or a store page opens.
// state: "soon" (no store page yet: the button shows 곧 출시 and links nowhere), "preorder" or "live".
// appStore.pt is App Store Connect's provider token (Analytics > Campaigns); with it, every App Store
// link carries ct=site-<app>-<spot> so App Store Connect counts what each spot of the site converts.
// appStore.ppid is a custom product page's id: the links open that page instead of the default one.
window.SITE_LINKS = {
  cardkkang: {
    site: "https://summerriversound.github.io/cardkkang/",
    appStore: { id: "6822955757", state: "preorder", pt: null, ppid: "6511ae59-331c-4852-8b63-a9a481f7bfc4" },
  },
  feathernote: {
    site: "https://summerriversound.github.io/feather-note/",
    appStore: { id: "6822205220", state: "preorder", pt: null, ppid: "4d2a11e0-8829-4943-b557-9e6e1e3d39fe" },
    play: { id: "com.feathernote.app", state: "soon" },
  },
};
