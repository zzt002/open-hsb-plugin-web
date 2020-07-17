export default {
  data() {
    return {
      currentValue: this.value,
    }
  },
  props:{
    value1: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  watch: {
    value1 (val) {
      alert(val);
      this.currentValue = val;
    }
  },
  methods: {
    render_input(h) {
      return h(
        'Input',
        {
          props: {
            value: this.currentValue,
            type: this.type,
          },
          on: {
            'on-change': (event) => {
              this.value1 = event.target.value;
            }
          }
        },
        [],
      );
    }
  },

  render(h) {
    return this.render_input(h);
  }
}
