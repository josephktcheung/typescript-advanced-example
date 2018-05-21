import { bootstrap } from "vesper";
import { PostController } from "./controller/PostController";
import { Post } from "./entity/Post";
import { CategoryController } from "./controller/CategoryController";
import { Category } from "./entity/Category";
import { PostResolver } from "./resolver/PostResolver";
import { createApolloFetch } from 'apollo-fetch';

const apolloFetch = createApolloFetch({ uri: 'http://localhost:3000/graphql' });
const request = {
    "operationName": "CreateCategory",
    "query": "mutation CreateCategory {\n  categorySave(name: \"a\") {name}}\n"
};

const run = async () => {
    const single = await apolloFetch(request);
    console.log('signle request reesult: ', JSON.stringify(single, null, 2));
    const multiple = await apolloFetch([request, request]);
    console.log('multiple requests result: ', JSON.stringify(multiple, null, 2));
}

bootstrap({
    port: 3000,
    controllers: [
        PostController,
        CategoryController
    ],
    resolvers: [
        PostResolver
    ],
    entities: [
        Post,
        Category
    ],
    schemas: [__dirname + "/schema/**/*.graphql"]
}).then(() => {
    console.log("Your app is up and running on http://localhost:3000 . " +
        "You can use Playground in development mode on http://localhost:3000/playground");
    return run();
}).catch(error => {
    console.error(error.stack ? error.stack : error);
});


