<script setup lang="ts">
const scales: {
    grade: string;
    title: string;
    description: string;
    features: string[];
}[] = [
        {
            grade: "A",
            title: "Altered A",
            description: "Figure is authentic but has alterations",
            features: [
                "Unofficial printing",
                "Drawn additions",
                "Stickers",
                "Gluing etc…",
            ],
        },
        {
            grade: "1",
            title: "Damaged",
            description: "Figure has major damage",
            features: [
                "Major yellowing",
                "Large cracks (torso, legs, arms)",
                "Dents / scratches",
                "Stained",
            ],
        },
        {
            grade: "2",
            title: "Damaged",
            description: "Figure has moderate damage",
            features: [
                "Moderate yellowing",
                "Moderate cracking (legs, arms)",
                "Dented / scratched",
                "Stained",
            ],
        },
        {
            grade: "3",
            title: "Damaged",
            description: "Figure has minor damage",
            features: [
                "Minor yellowing",
                "Minor cracking (legs)",
                "Minor dents / scratches",
                "Damaged print",
            ],
        },
        {
            grade: "4",
            title: "Poor",
            description: "Figure has many defects",
            features: [
                "Damaged print",
                "Hairline fractures",
                "Dents / Scratches",
                "Marks",
            ],
        },
        {
            grade: "5",
            title: "Good",
            description: "Figure is in good condition with few flaws",
            features: ["Damaged print", "Superficial marks"],
        },
        {
            grade: "6",
            title: "V Good",
            description: "Figure is in very good condition with few flaws",
            features: ["Minorly damaged print", "Superficial marks"],
        },
        {
            grade: "7",
            title: "Excellent",
            description: "Figure is in excellent condition with 3 flaws",
            features: [
                "Minorly damaged print",
                "No swing wear",
                "Very minor scratches",
            ],
        },
        {
            grade: "8",
            title: "Near MT",
            description: "Figure is in great condition with 2 flaws",
            features: [
                "No swing wear",
                "Micro scratches",
                "Very few to no superficial marks",
            ],
        },
        {
            grade: "9",
            title: "Mint",
            description: "Figure is almost perfect with 1 flaw",
            features: ["Little wing wear", "Few micro scratches"],
        },
        {
            grade: "10",
            title: "Gem MT",
            description: "Figure is virtually perfect",
            features: ["No wing wear", "Very few to no micro scratches"],
        },
        {
            grade: "10",
            title: "Pristine",
            description: "Figure is flawless",
            features: [
                "New / appears new",
                "No wing wear",
                "No scratches",
                "No micro marks",
            ],
        },
    ];
</script>

<template>
    <div>
        <div class="text-5xl font-bold text-center mt-4">Our Grading Scale</div>
        <div class="text-lg text-center mt-4 w-3/4 mx-auto">
            Our grading scale was meticulously crafted to prioritize objectivity
            above all else. Utilizing detailed imaging, our team of experts
            compares your figures against our comprehensive criteria to
            precisely assess their conditions.
        </div>
        <div class="mt-10 w-11/12 mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div v-for="scale in scales" :key="scale.grade"
                    class="dark:bg-surface-800 bg-surface-400 shadow-md hover:shadow-2xl transition-shadow duration-300 p-6 rounded-xl">
                    <div>
                        <span class="text-2xl font-extrabold"
                            :class="`${scale.title === 'Pristine' ? 'text-yellow-500' : 'text-primary'}`">{{
                                scale.grade
                            }}</span>
                        <span class="ml-4 text-xl font-semibold ">{{
                            scale.title
                        }}</span>
                    </div>
                    <Divider />
                    <div class="mt-2  font-semibold">
                        {{ scale.description }}
                    </div>
                    <ul class="mt-4 list-disc list-inside  space-y-1">
                        <li v-for="feature in scale.features" :key="feature">
                            {{ feature }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mt-10 text-center w-1/6 mx-auto">
            <Button class="w-full text-lg">
                <span class="text-lg font-semibold">Submit Now!</span>
            </Button>
        </div>
    </div>
</template>

<style scoped></style>
