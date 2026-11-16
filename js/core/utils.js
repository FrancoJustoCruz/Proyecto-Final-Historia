export const $ = (sel, scope = document) => scope.querySelector(sel);
export const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
export const getRoot = () => document.body.dataset.root ?? "";
export const getPage = () => document.body.dataset.page ?? "";
