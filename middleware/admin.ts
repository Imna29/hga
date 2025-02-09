export default defineNuxtRouteMiddleware(() => {
  const user = useUser();


  if (!user.isSignedIn.value || !user.user.value?.publicMetadata.isAdmin) {
    if (user.user.value?.publicMetadata.isAdmin === undefined) {
      return navigateTo('/sign-in?redirect_url='+ window.location.pathname);
    }
    if (user.user.value?.publicMetadata.isAdmin === false) {
      return navigateTo('/sign-in');
    }
  }
})