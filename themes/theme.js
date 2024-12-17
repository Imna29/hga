import { dark } from '@clerk/themes';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const MyPreset = definePreset(Aura, {
    components: {
        inputtext: {
            colorScheme: {
                light: {
                    color: '{black}',
                },
                dark: {
                    color: '',
                }
            }
        }
    },
    semantic: {
        primary: {
            50: '#e3e8f8', // Lightest shade
            100: '#c6cef1',
            200: '#a7b3ea',
            300: '#8999e3',
            400: '#6b7eda',
            500: '#1a36b4', // Base primary color
            600: '#172f9f',
            700: '#14288b',
            800: '#111f73',
            900: '#0e185c', // Darkest shade
            950: '#0b1347',
        },


        colorScheme: {
            dark: {
                primary: {
                    color: '#1a36b4' // Base primary color for dark mode
                },

            },
            light: {
                primary: {
                    color: '#1a36b4' // Base primary color for light mode
                },



                surface: {
                    50: '{orange-50}',
                    100: '{orange-100}',
                    200: '{orange-200}',
                    300: '{orange-300}',
                    400: '{gray-400}',
                    500: '{gray-500}',
                    600: '{gray-600}',
                    700: '{gray-700}',
                    800: '{gray-800}',
                    900: '{gray-900}',
                    950: '{gray-950}',
                }
            }
        }
    }
});

export default {
    preset: MyPreset,
    options: {
        darkModeSelector: '.dark-mode'
    }
};
