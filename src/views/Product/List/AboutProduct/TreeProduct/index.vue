<template>
  <el-tree  accordion :props="props" :load="loadNode" lazy @node-click="passNodeData"> </el-tree>
</template>
<script>
export default {
  name: "treeProduct",
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      }
    };
  },
  methods: {
    async loadNode(node, resolve) {
      if (node.level === 0) {
        let result = await this.getDataTree(1);
        return resolve(result.splice(0, 5));
      }
      if (node.level >= 1){
        let result = await this.getDataTree(node.data.cid);
        return resolve(result.splice(0, 6));
      } 
    },
    // 获得数据
    async getDataTree(type) {
      let res = await this.$API.reqProductCategory({ type });
      if (res.status == 200) {
        return res.result;
      } else {
        return [];
      }
    },
    passNodeData(data,node){
      this.$bus.$emit('sendTreeData',data)
    },
  },
};
</script>

<style>
</style>