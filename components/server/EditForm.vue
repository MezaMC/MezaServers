<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod';
import {z} from 'zod';
import UButton from "~/components/ui/UButton.vue";
import {useField, useForm} from 'vee-validate';
import TextArea from "~/components/ui/TextArea.vue";
import {toast} from "vue-sonner";
import type {ServerDisplay} from "~/server/utils/servers";

type EditableValues = {
  display?: ServerDisplay
  ip: string
  port?: number
  desc?: string
  status: ServerStatus
  images?: string[]
  links?: ServerLinks
}

const serverData = inject<Ref<ServerData>>("server")!
const initialValues = computed(() => { return <EditableValues>{
  display: serverData.value.display,
  ip: serverData.value.ip,
  port: serverData.value.port,
  status: serverData.value.status,
  images: serverData.value.images,
  desc: serverData.value.desc,
  links: serverData.value.links
}})

const refresh = inject<() => Promise<void>>('refreshFun')!

const zLink = z.string().trim().url("Неверный формат ссылки").max(128, "Максимум 128 символов")
const validationSchema = toTypedSchema(
    z.object({
      display: z.object({
        name: z.string().max(64, 'Максимум 64 символа').optional(),
        desc: z.string().max(256, "Максимум 256 символов").optional(),
        favicon: zLink.optional().or(z.literal(""))
      }),
      links: z.object({
        discord: zLink.optional(),
        telegram: zLink.optional(),
        youtube: zLink.optional(),
        site: zLink.optional(),
        donate:zLink.optional()
      }),
      ip: z.string().nonempty('Адрес обязателен').max(64, 'Максимум 64 символа'),
      port: z.coerce.number().min(0, 'Минимальное значение - 0').max(65535, 'Максимальное значение - 65535').optional(),
      desc: z.string().max(2048, "Максимум 2048 символов").optional(),
      status: z.enum(["active", "frozen", "maintenance"]),
      images: z.array(zLink).max(16, "Максимум 16 изображений").optional()
    })
)

const { handleSubmit, errors, values } = useForm({ validationSchema, initialValues: initialValues.value as any })

const sortStringify = (obj: any) => JSON.stringify(obj,
    (_, value) => (typeof value === 'object' && value !== null) ?
        Object.fromEntries(Object.entries(value).sort()) : value)
const editedValues = computed(() => {
  const editedValues: {[key: string]: any} = {}
  let initValue
  for (const [key, value] of Object.entries(values)) {
    initValue = initialValues.value[key as keyof EditableValues]
    if (sortStringify(initValue) != sortStringify(value)) {
      if (!value || value.toString() === "") {
        if (initValue) editedValues[key] = null
        else delete editedValues[key]
      }
      else editedValues[key] = value
    }
  }
  return editedValues
})

const displayName = useField<string | undefined>('display.name').value
const displayDesc = useField<string | undefined>('display.desc').value
const displayFavicon = useField<string | undefined>('display.favicon').value
const ip = useField<string>('ip').value
const port = useField<number | undefined>('port').value
const desc = useField<string | undefined>('desc').value
const status = useField<ServerStatus>('status').value
const images = useField<string[] | undefined>('images').value
const links = useField<{[key: string]: string} | undefined>('links').value

const onSubmit = handleSubmit(async () => {
  const resp: any = await $fetch(`/api/server/${serverData.value.name}/edit`, {
    method: 'post',
    body: {
      data: editedValues.value
    }
  })
  if (resp.status === "ok") {
    await refresh()
    toast.success("Данные были сохранены")
  } else if (resp.status === "error") {
    toast.error(resp.message)
  }
})

const isDisabled = computed(() => Object.keys(editedValues.value).length === 0 || Object.keys(errors.value).length !== 0)

const imagesString = computed({
  get: () => images.value?.join('\n'),
  set: (newString: string) => {images.value = newString.split('\n')}
})

const possibleLinks = ["discord", "telegram", "youtube", "site", "donate"]
const linksString = computed({
  get: () => {
    const linksObj = links.value
    if (linksObj == undefined) return ""
    let res = []
    for (const [key, value] of Object.entries(linksObj)) {
      if (value != undefined) res.push(`${key}: ${value}`)
    }
    return res.join("\n")
  },
  set: (newString: string) => {
    const entries = newString.split('\n')
    if (links.value == undefined) return
    let keyVal
    links.value = {}
    for (const entry of entries) {
      keyVal = entry.split(": ")
      if (keyVal.length != 2) continue
      if (!possibleLinks.includes(keyVal[0])) continue
      links.value[keyVal[0]] = keyVal[1]
    }
  }
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-14 mt-10 max-w-full overflow-hidden">

    <div class="grid gap-4 cols-3 lt-sm:cols-2 lt-phone:cols-1">

      <div class="form-field col-span-2 lt-sm:col-span-1">
        <label for="name">Название сервера</label>
        <input id="name" v-model="displayName" type="text" />
        <span class="error-message" v-if="errors['display.name']">{{ errors['display.name'] }}</span>
      </div>

      <div class="form-field">
        <label for="desc">Статус сервера</label>
        <select v-model="status" id="status">
          <option value="active">Активен</option>
          <option value="maintenance">Тех. работы</option>
          <option value="frozen">Заморожен</option>
        </select>
      </div>

      <div class="form-field col-span-2 lt-sm:col-span-1">
        <label for="ip">Адрес</label>
        <input id="ip" v-model="ip" type="text" placeholder="IP или домен" class="font-mono" />
        <span class="error-message" v-if="errors.ip">{{ errors.ip }}</span>
      </div>

      <div class="form-field">
        <label for="port">Порт</label>
        <input id="port" v-model="port" type="number" placeholder="25565" class="font-mono" />
        <span class="error-message" v-if="errors.port">{{ errors.port }}</span>
      </div>

    </div>

    <div class="logic-group">
      <div class="form-field">
        <label for="displayDesc">Короткое описание</label>
        <input v-model="displayDesc" id="displayDesc" />
        <span class="error-message" v-if="errors['display.desc']">{{ errors['display.desc'] }}</span>
      </div>
      <div class="form-field">
        <label for="desc">Описание</label>
        <TextArea v-model="desc" id="desc" placeholder="Поддерживает Markdown." />
        <span class="error-message" v-if="errors.desc">{{ errors.desc }}</span>
      </div>
    </div>

    <div class="logic-group">
      <div class="form-field">
        <label for="displayFavicon">Иконка</label>
        <input v-model="displayFavicon" class="font-mono" id="displayFavicon" />
        <span class="error-message" v-if="errors['display.favicon']">{{ errors['display.favicon'] }}</span>
      </div>
      <div class="form-field">
        <label for="images">Галерея</label>
        <TextArea v-model="imagesString" id="images" class="font-mono" placeholder="Ссылки на изображения. Каждая ссылка с новой строки." />
        <span class="error-message" v-if="errors.images">{{ errors.images }}</span>
      </div>
      <div class="form-field">
        <label for="links">Ссылки</label>
        <TextArea v-model="linksString" id="links" class="font-mono" />
        <span class="error-message" v-if="errors.links">{{ errors.links }}</span>
      </div>
      <button type="submit" class="mt-4" :disabled="isDisabled">
        <UButton icon="lucide:save" :inactive="isDisabled">Сохранить</UButton>
      </button>
    </div>

  </form>

<!--  <pre>{{ JSON.stringify(values, null, 2) }}</pre>-->
<!--  <pre>{{ JSON.stringify(editedValues, null, 2) }}</pre>-->
<!--  <pre>{{ initialValues }}</pre>-->
</template>

<style lang="scss" scoped>
.error-message {
  color: #ee0000;
  font-size: 0.875rem;
}

.form-field {
  @apply "flex flex-col gap-1 min-w-0";
}

button, label {
  width: fit-content;
}

.logic-group {
  @apply "flex flex-col gap-4"
}
</style>
