export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newDoc = new model(data); // ✅
      await newDoc.save();
      return newDoc;
    },
    getAll: async function () {
      const allDocs = await model.find();
      return allDocs;
    },
    getById: async function (id) {
      const doc = await model.findById(id);
      return doc;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    update: async function (id, data) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedDoc;
    },
  };
}
