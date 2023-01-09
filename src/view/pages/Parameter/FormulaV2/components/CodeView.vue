<template>
    <div>
        <pre v-html="replacedCodeWithHtml"></pre>
            <!-- <highlight-code lang="js" class="language-js"> -->
                <!-- <slot name="js" v-html="code"></slot> -->
                    <!-- <component :is="code"></component> -->
            <!-- </highlight-code> -->
            <!-- <RenderHtml :html="code"/> -->
            <!-- <highlight-code lang="js" class="language-js" v-html="code">
                <slot name="js">
                
                </slot>
            </highlight-code> -->
              <!-- <highlight-code lang="js" class="language-js" v-html="replacedCodeWithHtml"></highlight-code> -->
    </div>
</template>

<script>
// import RenderHtml from './RenderHtml.vue';
// import Prism Editor
// import { PrismEditor } from "vue-prism-editor";
// import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// // import highlighting library (you can use any library you want just return html string)
// import { highlight, languages } from "prismjs/components/prism-core";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";
// import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  components: {
    // PrismEditor,
    // RenderHtml
  },
  props: {
      code: String,
      ports: []
  },
  data() {
    return {
    //   code: "// type your code here...",
    };
  },
  computed: {
    replacedCodeWithHtml() {
        let formula = String(this.code);
        for (let i = 0; i < this.formulaMasters.length; i++) {
            const master = this.formulaMasters[i];
            for (let j = 0; j < master.columns.length; j++) {
                const column = master.columns[j];
                const regexCode = `{MASTER:${master.table}:${column}}`;
                
                formula = formula.replace(new RegExp(regexCode, 'g'), `<span class="badge badge-primary badge-pill">${column}</span>`);
            }
        }

        for (let i = 0; i < this.ports.length; i++) {
            const port = this.ports[i];
            const regexCode = `{PORT:${port.identifier}}`;
            formula = formula.replace(new RegExp(regexCode, 'g'), `<span class="badge badge-warning badge-pill">${port.name}</span>`);
        }
        //   return formula.replace(new RegExp('{PORT:BBM}', 'g'), `<Test/>`);
        return formula;
    },
    codeReadyToEval() {
        let formula = String(this.code);
        for (let i = 0; i < this.masters.length; i++) {
            const master = this.masters[i];
            for (let j = 0; j < master.columns.length; j++) {
                const column = master.columns[j];
                const regexCode = `{MASTER:${master.table}:${column}}`;
                
                formula = formula.replace(new RegExp(regexCode, 'g'), `1`);
            }
        }

        for (let i = 0; i < this.ports.length; i++) {
            const port = this.ports[i];
            const regexCode = `{PORT:${port.identifier}}`;
            formula = formula.replace(new RegExp(regexCode, 'g'), `2`);
        }
        //   return formula.replace(new RegExp('{PORT:BBM}', 'g'), `<Test/>`);
        return formula;
    },

  },
  methods: {
    // highlighter(code) {
    //   return highlight(code, languages.js); // languages.<insert language> to return html with markup
    // },
    backPage() {
      this.$router.push({
          name: "FormulaV2List"
      });
    },
  },
};
</script>

<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background-color: #f3f6f9;
  max-height: 400px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px 10px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
/* not required */
.height-500 {
  height: 500px;
}
</style>
