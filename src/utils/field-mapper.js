import arrayToObject from 'vuex-map-fields/src/lib/array-to-object';

export default function mapDynamicFields (namespace, fields, indexField) {
  const fieldsObject = Array.isArray(fields) ? arrayToObject(fields) : fields;

  return Object.keys(fieldsObject).reduce((prev, key) => {
    const field = {
      get () {
        // 'this' refer to vue component
        const path = fieldsObject[key].replace('[]', `[${this[indexField]}]`);
        return this.$store.getters[`${namespace}/getField`](path);
      },
      set (value) {
        // 'this' refer to vue component
        const path = fieldsObject[key].replace('[]', `[${this[indexField]}]`);
        this.$store.commit(`${namespace}/updateField`, { path, value });
      }
    };

    prev[key] = field;
    return prev;
  }, {});
}
