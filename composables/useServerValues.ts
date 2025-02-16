import DOMPurify from "dompurify";

export const useServerValues = (serverData: Ref<ServerData>) => {
    return {
        displayName: computed(() => serverData.value.display?.name || serverData.value.name),

        address: computed(() => serverData.value.port ? `${serverData.value.ip}:${serverData.value.port}` : serverData.value.ip),

        route: computed(() => `/server/${serverData.value.name}`),

        descHtml: computed(() => DOMPurify.sanitize(
            serverData?.value.display?.desc || "",
            {ALLOWED_TAGS: ['span', 'b', 'i']}
        ))
    }
}
