import Vue from 'vue';
import CTFEditor from "./components/CTFEditor.vue";
new Vue({
    el: "#root",
    components: {
        "ctf-editor": CTFEditor
    }
})