import { appWindow } from "@tauri-apps/api/window";

export function toggleTheme(darkTheme = false) {
  document.body.setAttribute("arco-theme", darkTheme ? "dark" : "light");
}

export async function setAlwaysOnTop(alwaysOnTop: boolean) {
  if (!window.__TAURI__) return;
  await appWindow.setAlwaysOnTop(alwaysOnTop);
}
