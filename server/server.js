const PATH_PROTO = "./question.proto";
const grpc = require("@grpc/grpc-js");
const ProtoLoader = require("@grpc/proto-loader");
const ConnectDB = require("./Database/ConnectDB");
const Question = require("./Schema/QuestionSchema");
ConnectDB();
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefination = ProtoLoader.loadSync(PATH_PROTO, options);
const questionProto = grpc.loadPackageDefinition(packageDefination);

const searchQuestion = async (query, limit, page, types) => {
  try {
    const typeArray = types ? types.split(",") : [];
    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    };

    const q = {};

    if (query) {
      q.title = { $regex: query, $options: "i" };
    }

    if (typeArray.length > 0) {
      q.type = { $in: typeArray };
    }

    const results = await Question.find(q, null, options);
    const totalCount = await Question.countDocuments(q);

    const data = {
      questions: results,
      next: { page: page, limit: limit },
      prev: { page: page, limit: limit },
      totalpages: Math.ceil(totalCount / limit),
      totalcount: totalCount,
    };
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const server = new grpc.Server();
server.addService(questionProto.QuestionService.service, {
  SearchQuestions: async (call, callback) => {
    const result = await searchQuestion(
      call.request.title,
      call.request.limit,
      call.request.page,
      call.request.types
    );

    callback(null, result);
  },
});
const PORT = process.env.PORT || "50051";
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    server.start();
  }
);
