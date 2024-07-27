import { apiInitializer } from "discourse/lib/api";
export default apiInitializer("0.8", (api) => {
  api.reopenWidget("post-menu", {
    menuItems() {        
      const hideForNewUser  = settings.hide_from_new_users &&
                              this.currentUser &&
                              this.currentUser.trust_level === 0;
      
      const hideForAnon     = settings.hide_from_anons && !this.currentUser;

      const hideForSilenced = settings.hide_from_silenced &&
                              this.currentUser &&
                              this.currentUser.silenced === true

      console.log(this.siteSettings.post_menu.split("|"))
      if (hideForNewUser || hideForAnon || hideForSilenced) {
        return this.siteSettings.post_menu
          .split("|")
          .filter((item) => item !== "like");
      }
      return this.siteSettings.post_menu.split("|").filter(Boolean);
    },
  });
});
