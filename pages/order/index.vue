<script setup lang="ts">
import type { FileUploadSelectEvent } from "primevue";
import { z } from "zod";

definePageMeta({
    title: "Place an Order",
})
enum ServiceType {
    VALUE = "VALUE",
    CORE = "CORE",
    BULK = "BULK",
    PLUS = "PLUS",
    PREMIUM = "PREMIUM",
    ULTIMATE = "ULTIMATE",
}
const ordersStore = useOrdersStore();
const uploading = ref<boolean>(false);

const createOrderSchema = z.object({
    type: z.nativeEnum(ServiceType),
    quantity: z.number().min(1).max(50),
    items: z.array(z.object({
        name: z.string().min(1, { message: "Name is required for all figures." }),
        description: z.string().optional(),
        files: z.array(z.any()).min(1, { message: "At least one image is required for each figure." }).max(5, { message: "Maximum of 5 images allowed for each figure." }),
        declaredValue: z.number().min(1, { message: "Declared value must be greater than 0." }),
    })).min(1).max(50),
});

const user = useUser();
const route = useRoute();
let initType: ServiceType = ServiceType.CORE;
if (route.query.type) {
    if (Object.values(ServiceType).includes(route.query.type as ServiceType)) {
        initType = route.query.type.toString().toUpperCase() as ServiceType;
    }
}

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
    validationSchema: toTypedSchema(createOrderSchema),
    initialValues: {
        type: initType,
        quantity: initType === "BULK" ? 5 : 1,
        items: Array.from({ length: initType === "BULK" ? 5 : 1 }, () => ({ name: "", description: "", files: [], declaredValue: 0 })),
    },
});

const [type] = defineField("type");
const [quantity] = defineField("quantity");
const [items] = defineField("items");


watch(quantity, (newQuantity, oldQuantity) => {
    if (newQuantity === undefined || items.value === undefined) return;
    if (newQuantity > (oldQuantity ?? 0)) {
        while (items.value.length < newQuantity) {
            items.value.push({ name: "", description: "", files: [], declaredValue: 0 });
        }
    } else {
        items.value.splice(newQuantity);
    }
}, { immediate: true });

watch(type, (newType) => {
    if (newType === "BULK") {
        setFieldValue<"quantity">("quantity", 5);
    } else {
        setFieldValue<"quantity">("quantity", 1);
    }
});

const submit = handleSubmit(async (values) => {
    uploading.value = true;
    const orderData = {
        type: values.type,
        quantity: values.quantity,
    }

    const orderResult = await ordersStore.ordersRepo.createOrder(orderData);

    for (let index = 0; index < values.items.length; index++) {
        const item = values.items[index];
        const itemFiles = values.items[index].files;

        const formData = new FormData();
        formData.append("name", item.name);
        if (item.description) {
            formData.append("description", item.description);
        }

        // Convert declaredValue to cents
        formData.append("declaredValue", (item.declaredValue * 100).toString());

        for (let i = 0; i < itemFiles.length; i++) {
            formData.append("images", itemFiles[i]);
        }


        await ordersStore.ordersRepo.createOrderItem(orderResult.id, formData);

    }

    const stripe_url = await ordersStore.ordersRepo.createCheckoutSession(orderResult.id);
    //navigate to stripe checkout url in new tab
    window.open(stripe_url);
    uploading.value = false;
});

const prices = {
    VALUE: 29.99,
    CORE: 34.99,
    BULK: 24.99,
    PLUS: 44.99,
    PREMIUM: 69.99,
    ULTIMATE: 84.99,
};

const minimumQuantity = computed(() => {
    return type.value === "BULK" ? 5 : 1;
});

const maxiQuantity = computed(() => {
    return type.value === "BULK" ? 50 : 4;
});

function onFileSelect(index: number, event: FileUploadSelectEvent) {
    const selectedFiles = event.files;
    items.value![index].files = selectedFiles;
}
</script>

<template>
    <div>
        <SignedIn>
            <h1 class="text-5xl font-bold text-center mt-4">Place an Order</h1>
            <div class="grid md:grid-cols-2 grid-cols-1 mt-4" v-if="user.user.value">
                <div class="col-span-1">
                    <Stepper value="1" linear>
                        <StepList>
                            <Step value="1">Order Info</Step>
                            <Step value="2">Submission Info</Step>
                            <Step value="3">Checkout</Step>
                        </StepList>
                        <StepPanels>
                            <StepPanel v-slot="{ activateCallback }" value="1">
                                <div class="flex flex-col gap-4 p-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="col-span-1  flex flex-col gap-2">
                                            <label for="firstName" class="text-lg">First name</label>
                                            <InputText id="firstName" :placeholder="user.user.value!.firstName!"
                                                disabled />
                                        </div>
                                        <div class="col-span-1 flex flex-col gap-2">
                                            <label for="lastName" class="text-lg">Last name</label>
                                            <InputText id="lastName" :placeholder="user.user.value!.lastName!"
                                                disabled />
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for="email" class="text-lg">Email address</label>
                                        <InputText id="email" class="w-1/2"
                                            :placeholder="user.user.value?.primaryEmailAddress?.emailAddress"
                                            disabled />
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for="type" class="text-lg">Service Type</label>
                                        <Select v-model="type" class="w-1/2" id="type"
                                            :invalid="errors.type !== undefined" :options="[
                                                { label: 'Value', value: 'VALUE' },
                                                { label: 'Core', value: 'CORE' },
                                                { label: 'Bulk', value: 'BULK' },
                                                { label: 'Plus', value: 'PLUS' },
                                                { label: 'Premium', value: 'PREMIUM' },
                                                { label: 'Ultimate', value: 'ULTIMATE' }
                                            ]" optionLabel="label" optionValue="value">
                                        </Select>
                                        <label for="quantity" class="text-lg">Number of figures</label>
                                        <InputNumber class="w-1/2" showButtons buttonLayout="horizontal"
                                            :min="minimumQuantity" :max="maxiQuantity" v-model="quantity"></InputNumber>
                                    </div>
                                    <div class="mt-2 w-full text-end text-lg font-semibold">
                                        Total: ${{ quantity! * prices[type!] }}
                                    </div>
                                </div>
                                <div class="flex py-4 justify-end px-4">
                                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                        @click="activateCallback('2')" />
                                </div>
                            </StepPanel>
                            <StepPanel v-slot="{ activateCallback }" value="2">
                                <div class="p-4">
                                    <BlockUI :blocked="uploading">
                                        <div v-for="(item, index) in items" :key="index">
                                            <Fieldset :legend="'Figure ' + (index + 1)" :toggleable="true"
                                                :collapsed="(index + 1) !== 1">
                                                <div class="flex flex-col gap-2">
                                                    <div class="flex flex-col gap-2">
                                                        <label for="name" class="text-lg">Name<span
                                                                class="text-red-500">*</span></label>
                                                        <InputText v-model="item.name" id="name"
                                                            placeholder="Enter name" class="w-1/2" required />
                                                    </div>
                                                    <div class="flex flex-col gap-2">
                                                        <label for="description" class="text-lg">Description</label>
                                                        <Textarea v-model="item.description" id="description"
                                                            placeholder="Enter description" />

                                                    </div>
                                                    <div class="flex flex-col gap-2">
                                                        <label for="description" class="text-lg">Declared Value</label>

                                                        <InputNumber v-model="item.declaredValue" inputId="integeronly"
                                                            fluid />

                                                    </div>
                                                    <div class="">
                                                        <FileUpload :custom-upload="true" :auto="false"
                                                            @select="onFileSelect(index, $event)"
                                                            :max-file-size="10485760" :file-limit="5" :multiple="true"
                                                            accept="image/*"></FileUpload>
                                                    </div>
                                                </div>
                                            </Fieldset>

                                        </div>
                                        <Message v-if="errors.items" severity="error" class="mt-2">
                                            {{ errors.items }}
                                        </Message>
                                        <div class="mt-2 w-full text-end text-lg font-semibold">
                                            Total (Without fees): ${{ quantity! * prices[type!] }}
                                        </div>
                                    </BlockUI>
                                </div>
                                <div class="flex py-4 justify-between px-4">
                                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                        @click="activateCallback('1')" />
                                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="submit()" />
                                </div>
                            </StepPanel>

                        </StepPanels>
                    </Stepper>
                </div>
                <div class="col-span-1">
                </div>
            </div>
        </SignedIn>
        <SignedOut>
            <RedirectToSignIn />
        </SignedOut>
    </div>
</template>

<style scoped></style>