export default defineOAuthGitHubEventHandler({
    config: {

    },
    async onSuccess(event, { user, tokens }) {
        console.log(user.username);
        await setUserSession(event, { user: { login: user.login, id: user.id } });
        return sendRedirect(event, "/");
    },
    onError(event, error) {
        console.error("Discord OAuth error:", error);
        return sendRedirect(event, "/");
    },
})