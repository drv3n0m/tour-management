const Tour = require("../models/Tour");

exports.getTourServices = async (queries) => {
  const tour = await Tour.find(queries)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Tour.countDocuments();
  const page = Math.ceil(total / queries.limit);

  return { total, page, tour };
};

exports.getTourByIdService = async (id) => {
  await Tour.updateOne({ _id: id }, { $inc: { viewCount: 1 } });
  return await Tour.find({ _id: id });
};

exports.getTrendingServices = async () => {
  return await Tour.find().sort({ viewCount: -1 }).limit(3);
};

exports.getCheapestServices = async () => {
  return await Tour.find().sort({ price: 1 }).limit(3);
};

exports.createTourService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

exports.updateTourByIdService = async (tourId, data) => {
  return await Tour.updateOne(
    { _id: tourId },
    { $set: data },
    { runValidators: true, upsert: true }
  );
};
