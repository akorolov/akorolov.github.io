

var { ContainerMixin, ElementMixin, HandleDirective } = window.VueSlicksort;

class Character {
  constructor(name,init) {
    this.name = name;
    this.init = init;
  }
};


const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item">{{item}} <button class="delete" v-on:click="remove">X</button></li>
  `,
  methods: {
    remove: function() {
      this.$emit('removed');
    },
  }
};



const ExampleVue = {
  name: 'Example',
  props: ['newName'],
  methods: {
    addCharacter: function () {
      console.log('heyo');
      this.items.push(this.newName);
      this.newName = "";
    },
    removeCharacter: function(item) {
      var index = this.items.indexOf(item);
      this.items.splice(index, 1);
    },
  },
  template: `
    <div class="root">
      <SortableList lockAxis="y" v-model="items">
        <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item" @removed='removeCharacter(item)'/>
      </SortableList><br>
      <input type="text" placeholder="Add a character name" autofocus class="text-input" v-model="newName" v-on:keyup.enter="addCharacter">
    </div>
  `,
  components: {
    SortableItem,
    SortableList,
  },
  data() {
  return {
    items: []
  };
}
};

var app = new Vue({
  el: '#root',
  data: {
    newName: "",
  },
  render: h => h(ExampleVue),
});
