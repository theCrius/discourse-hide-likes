import { apiInitializer } from "discourse/lib/api";
export default apiInitializer("0.8", (api) => {
  api.reopenWidget("post-menu", {
    menuItems() {
      if (this.currentUser) console.log(this.currentUser)
        
      const hideForNewUser  = settings.hide_from_new_users &&
                              this.currentUser &&
                              this.currentUser.trust_level === 0;
      
      const hideForAnon     = settings.hide_from_anons && !this.currentUser;

      const hideForSilenced = settings.hide_from_silenced &&
                              this.currentUser &&
                              this.currentUser.silenced === true
      
      if (hideForNewUser || hideForAnon) {
        return this.siteSettings.post_menu
          .split("|")
          .filter((item) => item !== "like");
      }
      return this.siteSettings.post_menu.split("|").filter(Boolean);
    },
  });
});
