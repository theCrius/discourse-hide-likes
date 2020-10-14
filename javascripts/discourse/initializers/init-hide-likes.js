import { apiInitializer } from "discourse/lib/api";
export default apiInitializer("0.8", (api) => {
  api.reopenWidget("post-menu", {
    menuItems() {
      const hideForNewUser =
        settings.hide_from_new_users &&
        this.currentUser &&
        this.currentUser.trust_level === 0;
      const hideForAnon = settings.hide_from_anons && !this.currentUser;

      if (hideForNewUser || hideForAnon) {
        return this.siteSettings.post_menu
          .split("|")
          .filter((item) => item !== "like");
      }
      return this.siteSettings.post_menu.split("|").filter(Boolean);
    },
  });
});
