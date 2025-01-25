mkdir -p ./client/src/proto
protoc --proto_path=. ./proto/question.proto --js_out=import_style=commonjs:./client/src  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./client/src

