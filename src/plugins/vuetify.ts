import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#f06f2e",
                secondary: "#f7a57c",
                accent: "#d41c1c"
            },
        },
    },
});
