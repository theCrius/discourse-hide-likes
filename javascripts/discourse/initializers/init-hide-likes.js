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

      console.log(settings.hide_from_silenced, this.currentUser, this.currentUser.silenced === true)
      console.log(hideForNewUser, hideForAnon, hideForSilenced)
      let post_menu = [];
      if (hideForNewUser || hideForAnon || hideForSilenced) {
        post_menu = this.siteSettings.post_menu
          .split("|")
          .filter((item) => item !== "like");
      } else {
        post_menu = this.siteSettings.post_menu.split("|").filter(Boolean);
      }
      console.log(post_menu);
      return post_menu;
    },
  });
});
