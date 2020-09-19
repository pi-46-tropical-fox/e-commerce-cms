<template>
    <div class="dropdown-select">
        <input
            v-if="Object.keys(selectedItem).length === 0"
            ref="dropdowninput"
            v-model.trim="inputValue"
            class="dropdown-input"
            type="text"
            placeholder="Find Categories"
        />
        <div v-else @click="resetSelection" class="dropdown-selected">
            {{ selectedItem.name }}
        </div>
        <div v-show="inputValue && listLoaded" class="dropdown-list">
            <div
                @click="selectItem(item)"
                v-show="itemVisible(item)"
                v-for="item in categories"
                :key="item.name"
                class="dropdown-item"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'CategoryList',

    data() {
        return {
            selectedItem: {},
            inputValue: '',
            listLoaded: false,
        };
    },
    created() {
        this.getList();
    },
    computed: {
        ...mapState(['categories']),
    },
    methods: {
        ...mapActions(['fetchCategories']),
        resetSelection() {
            this.selectedItem = {};
            this.$nextTick(() => this.$refs.dropdowninput.focus());
            this.$emit('on-item-reset');
        },
        selectItem(theItem) {
            this.selectedItem = theItem;
            this.inputValue = '';
            this.$emit('on-item-selected', theItem);
        },
        itemVisible(item) {
            let currentName = item.name.toLowerCase();
            let currentInput = this.inputValue.toLowerCase();
            return currentName.includes(currentInput);
        },
        getList() {
            this.fetchCategories();
            this.listLoaded = true;
        },
    },
};
</script>

<style>
.dropdown-select {
    position: relative;
    width: 100%;
    max-width: 400px;
}
.dropdown-input,
.dropdown-selected {
    width: 100%;
    padding: 10px 16px;
    border: 1px solid transparent;
    background: #edf2f7;
    line-height: 1.5em;
    outline: none;
    border-radius: 8px;
}
.dropdown-input:focus,
.dropdown-selected:hover {
    background: #fff;
    border-color: #e2e8f0;
}
.dropdown-input::placeholder {
    opacity: 0.7;
}
.dropdown-selected {
    font-weight: bold;
    cursor: pointer;
}
.dropdown-list {
    z-index: 10;
    position: absolute;
    width: 100%;
    max-height: 500px;
    margin-top: 4px;
    overflow-y: auto;
    background: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
}
.dropdown-item {
    display: flex;
    width: 100%;
    padding: 11px 16px;
    cursor: pointer;
}
.dropdown-item:hover {
    background: #edf2f7;
}
</style>
