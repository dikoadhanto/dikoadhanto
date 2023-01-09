<template>
  <section id="tree-view">
    <ul>
      <!-- show parent -->
      <li :class="[node.level == 1 && 'first-level', node.level == 2 && 'second-level', node.level == 3 && 'third-level']">
        <div class="row mb-2">
          <div class="col-md list-row">
            <span v-if="node.organizations" class="mr-2 toggle-sort">
              <i
                @click="
                  toggle(node.id);
                  isShow = !isShow;
                "
                class="fas fa-sm"
                :class="[isExtend == true && 'fa-chevron-right', isExtend == false && 'fa-chevron-up']"
                v-if="isShow"
              ></i>
              <i
                @click="
                  toggle(node.id);
                  isShow = !isShow;
                "
                class="fas fa-sm"
                :class="[isExtend == false && 'fa-chevron-right', isExtend == true && 'fa-chevron-up']"
                v-else
              ></i>
            </span>
            <span class="node-title mr-3">{{ node.name }} </span>
            <span class="mr-3" v-if="node.level != 0"><i title="Detail" class="fas fa-sm fa-eye icon-view" @click="showDetail(node)"></i></span>
            <span class="mr-3" v-if="node.level != 3"><i title="Tambah" class="fas fa-sm fa-plus icon-add" @click="showAdd(node)"></i></span>
            <span class="mr-3" v-if="node.level != 0"><i title="Edit" class="fas fa-sm fa-pen icon-edit" @click="showUpdate(node)"></i></span>
            <span class="mr-3" v-if="node.level != 0"><i title="Hapus" class="fas fa-sm fa-trash icon-delete" @click="removeOrganization(node)"></i></span>
          </div>
        </div>
      </li>

      <!-- show child -->
      <div v-show="isExtend" :id="node.id">
        <!-- call recursive group tree, props is child from looping node.child -->
        <TreeView
          v-for="(organization, i) in node.organizations"
          :isExtend="isExtend"
          :node="organization"
          :key="i"
          @detailOrg="$emit('detailOrg')"
          @addOrg="$emit('addOrg')"
          @updateOrg="$emit('updateOrg')"
          @removeOrg="$emit('removeOrg')"
        />
      </div>
    </ul>
  </section>
</template>

<script>
export default {
  props: ['node', 'isExtend'],
  emits: ['addOrg', 'detailOrg', 'updateOrg', 'removeOrg'],
  name: 'TreeView',
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    // toggle
    toggle(id) {
      const showDisplay = document.getElementById(id);
      if (showDisplay.style.display === 'none') {
        showDisplay.style.display = 'inline';
      } else {
        showDisplay.style.display = 'none';
      }
    },
    showDetail(org) {
      this.$store.commit('organization/setSelectedOrganization', org);
      this.$emit('detailOrg');
    },
    showAdd(org) {
      this.$store.commit('organization/setSelectedOrganization', org);
      this.$emit('addOrg');
    },
    showUpdate(org) {
      this.$store.commit('organization/setSelectedOrganization', org);
      this.$emit('updateOrg');
    },
    removeOrganization(org) {
      this.$store.commit('organization/setSelectedOrganization', org);
      this.$emit('removeOrg');
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
.list-row {
  display: table-cell;
  vertical-align: middle;
}
i:hover {
  color: #000000;
  cursor: pointer;
}
.node-title {
  font-size: 14px;
  font-weight: bold;
}

/* level of list */
.first-level {
  margin-left: 20px;
}
.second-level {
  margin-left: 40px;
}
.third-level {
  margin-left: 70px;
}
</style>
