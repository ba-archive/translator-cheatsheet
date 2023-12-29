import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";

export async function toggleTheme(darkTheme = false) {
  document.body.setAttribute("arco-theme", darkTheme ? "dark" : "light");
  try {
    const theme = await invoke("plugin:theme|get_theme");
    console.log(theme);
    if (theme === (darkTheme ? "dark" : "light")) return;
    invoke("plugin:theme|set_theme", {
      theme: darkTheme ? "dark" : "light",
    });
  } catch (error) {
    console.error(error);
  }
}

export async function setAlwaysOnTop(alwaysOnTop: boolean) {
  if (!window.__TAURI__) return 1;
  await appWindow.setAlwaysOnTop(alwaysOnTop);
  return 0;
}
