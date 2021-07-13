module.exports = function (validator) {
  return {
    data() {
      return {
        errors: {},
        fields: {},
      };
    },
    methods: {
      async onInput(event) {
        await validator[event.target.id]
          .check(event.target.value)
          .then(() => delete this.errors[event.target.id])
          .catch((err) => (this.errors[event.target.id] = err));
      },
    },
    watch: {
      fields: {
        deep: true,
        handler() {
          this.$emit('update', {
            fields: this.fields,
            errors: this.errors,
          });
        },
      },
    },
  };
};
