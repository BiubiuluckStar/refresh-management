<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 200px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
      ref="editor"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
export default {
  name: "WangEditor",
  props:['descs'],
  components: {
    Editor,
    Toolbar,
  },
  data() {
    return {
      editor: null,
      html: this.descs || '',
      toolbarConfig: { //菜单栏的配置
        //toolbarKeys-重新配置工具栏，显示哪些菜单，以及菜单的排序、分组
        toolbarKeys: [
          "headerSelect",
          "bold",
          "underline",
          "italic",
          "color",
          "bgColor",
          "fontSize",
          "fontFamily",
          "lineHeight",
          "bulletedList",
          "numberedList",
          "todo",
          "|",
          "emotion",
          "uploadImage",
          "insertLink",
          "insertTable",
          "codeBlock",
          "divider",
        ],
      }, 
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    // 编辑器的生命周期函数，自动调用
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    onChange() {
      // 将编辑器中的商品描述数据发送给父组件
      this.$bus.$emit("sendDescMsg", this.html);
    },
    clearEditor(){
      this.editor.clear()
    }
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<!-- <style src="@wangeditor/editor/dist/css/style.css"></style> -->
<style>
.w-e-text-container {
  height: 500px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>