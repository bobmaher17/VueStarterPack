<template>
  <div class="articles">
    <!-- Page Heading -->
    <h1 class="h4 mb-2 text-gray-800">Master Data / <b>Articles</b></h1>
    <!-- Page Heading -->

      <!-- Element -->
      <b-row>
        <b-col lg="2" class="my-3">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="6"
            label-cols-lg="6"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col lg="4" class="my-3 ml-auto">
          <b-input-group>
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <!-- Element End -->

      <!-- Main table element -->
      <div class="card">
        <div class="card-header">
          Articles
          <b-button pill
              size="sm"
              variant="success"
              @click="info(row.item, row.index, $event.target)"
              class="float-right"
            >
                <i class="fas fa-plus"></i> Add Data
            </b-button>
        </div>

        <b-table
          class="table table-bordered"
          show-empty
          small
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template v-slot:cell(name)="row">
            {{ row.value.first }} {{ row.value.last }}
          </template>

          <template v-slot:cell(actions)="row">
            <b-button pill
              v-b-tooltip.hover.top="'Detail'"
              size="sm"
              variant="info"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
                <i class="fas fa-info-circle"></i>
            </b-button>
            <b-button pill
              v-b-tooltip.hover.top="'Edit'"
              size="sm"
              variant="primary"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
                <i class="fas fa-pencil-alt"></i>
            </b-button>
            <b-button pill
              v-b-tooltip.hover.top="'Delete'"
              size="sm"
              variant="danger"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
                <i class="fas fa-trash-alt"></i>
            </b-button>
          </template>
        </b-table>
        
        <div class="card-footer">
          <b-col lg="3" class="my-0 ml-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
        </div>
      </div>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          isActive: true,
          age: 40,
          name: { first: "Dickerson", last: "Macdonald" },
        },
        { isActive: false, age: 21, name: { first: "Larsen", last: "Shaw" } },
        {
          isActive: false,
          age: 9,
          name: { first: "Mini", last: "Navarro" },
        },
        { isActive: false, age: 89, name: { first: "Geneva", last: "Wilson" } },
        { isActive: true, age: 38, name: { first: "Jami", last: "Carney" } },
        { isActive: false, age: 27, name: { first: "Essie", last: "Dunlap" } },
        { isActive: true, age: 40, name: { first: "Thor", last: "Macdonald" } },
        {
          isActive: true,
          age: 87,
          name: { first: "Larsen", last: "Shaw" },
        },
        { isActive: false, age: 26, name: { first: "Mitzi", last: "Navarro" } },
        {
          isActive: false,
          age: 22,
          name: { first: "Genevieve", last: "Wilson" },
        },
        { isActive: true, age: 38, name: { first: "John", last: "Carney" } },
        { isActive: false, age: 29, name: { first: "Dick", last: "Dunlap" } },
      ],
      fields: [
        {
          key: "name",
          label: "Person Full name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "age",
          label: "Person age",
          sortable: true,
          class: "text-center",
        },
        {
          key: "isActive",
          label: "is Active",
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
