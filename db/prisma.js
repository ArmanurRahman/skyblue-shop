"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var serverless_1 = require("@neondatabase/serverless");
var adapter_neon_1 = require("@prisma/adapter-neon");
var client_1 = require("@prisma/client");
var ws_1 = require("ws");
// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
serverless_1.neonConfig.webSocketConstructor = ws_1.default;
var connectionString = "".concat(process.env.DATABASE_URL);
// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
var pool = new serverless_1.Pool({ connectionString: connectionString });
// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
var adapter = new adapter_neon_1.PrismaNeon(pool);
// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
exports.prisma = new client_1.PrismaClient({ adapter: adapter }).$extends({
    result: {
        product: {
            price: {
                compute: function (product) {
                    return product.price.toString();
                },
            },
            rating: {
                compute: function (product) {
                    return product.rating.toString();
                },
            },
        },
    },
});
