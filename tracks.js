

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

var newname = "";

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item"><button class="secret" v-on:click="activateInEditMode" v-show="!isEditing">{{item}}</button><span v-show="isEditing" ><input v-model="newerName" type="text" class="text-input2" v-on:keyup.enter="updates"></span>  <button class="delete" v-on:click="remove">X</button></li>
  `,
  data() {
  return {
    newerName: "",
    isEditing: false,
  };
},
  methods: {
    remove: function() {
      this.$emit('removed');
    },
    activateInEditMode: function() {
        this.isEditing = true
    },
    updates: function() {
      this.isEditing = false;
      this.item = this.newerName;
      newname = this.newerName;
      this.$emit('updated');
    }
  }
};



const ExampleVue = {
  name: 'Example',
  props: ['newName'],
  methods: {
    addCharacter: function () {
      this.items.push(this.newName);
      this.newName = "";
    },
    removeCharacter: function(item) {
      var index = this.items.indexOf(item);
      this.items.splice(index, 1);
    },
    updateCharacter: function(item) {
      console.log(item);
      var index = this.items.indexOf(item);
      console.log(index);
      this.items[index] = newname;
      console.log(this.items);
    },
  },
  template: `
    <div class="root">
      <SortableList lockAxis="y" v-model="items">
        <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item" @removed='removeCharacter(item)' @updated='updateCharacter(item)'/>
      </SortableList><br>
      <input type="text" placeholder="Add a character" autofocus class="text-input" v-model="newName" v-on:keyup.enter="addCharacter">
    </div>
  `,
  components: {
    SortableItem,
    SortableList,
  },
  data() {
  return {
    items: ['Example Character (click to change my name)','Drag and drop to rearrange'],
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
