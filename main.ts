import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import { ProtoGrpcType } from "./proto/storage-node";

const pkgDef = protoLoader.loadSync(
  "../storage-node-p1/proto/storage-node.proto"
);

const proto = grpc.loadPackageDefinition(pkgDef) as unknown as ProtoGrpcType;
const client = new proto.proto.StorageNode(
  "localhost:8000",
  grpc.credentials.createInsecure()
);

client.Ping(
  {
    bidPrice: "100",
    fileSize: 100,
    segmentsCount: 100,
    timePeriod: 100,
  },
  (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Storage Node Ping Response");
    console.log(response);
  }
);
