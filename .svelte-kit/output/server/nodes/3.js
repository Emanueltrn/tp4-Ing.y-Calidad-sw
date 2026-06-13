

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/demo/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CgYago0D.js","_app/immutable/chunks/5F78g4gG.js","_app/immutable/chunks/Cg-cGqIv.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
