import { bootstrap } from "vesper";
import { PostController } from "./controller/PostController";
import { Post } from "./entity/Post";
import { CategoryController } from "./controller/CategoryController";
import { Category } from "./entity/Category";
import { PostResolver } from "./resolver/PostResolver";
import { createApolloFetch } from 'apollo-fetch';
import { getConnection } from "typeorm";

const apolloFetch = createApolloFetch({ uri: 'http://localhost:3000/graphql' });
const generateRequest = name => ({
    "operationName": "CreateCategory",
    "query": `mutation CreateCategory {\n  categorySave(name: \"${name}\") {name}}\n`
});

const run = async () => {
    const single = await apolloFetch(generateRequest('single'));
    console.log('single request result: ', JSON.stringify(single, null, 2));
    const batch = await apolloFetch([generateRequest('batch 1'), generateRequest('batch 2')]);
    console.log('batch requests result: ', JSON.stringify(batch, null, 2));
    const asynchronous = await Promise.all([
        apolloFetch(generateRequest('asynchronous 1')), apolloFetch(generateRequest('asynchronous 2'))
    ]);
    console.log('asynchronous requests result: ', JSON.stringify(asynchronous, null, 2));
}


const checkPersistence = async () => {
    const categoryRepository = getConnection().manager.getRepository(Category);
    const categories = await categoryRepository.find();

    console.log('categories persisted in db: ', JSON.stringify(categories, null, 2));
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
}).then(() => {
    return checkPersistence();
})
    .catch(error => {
        console.error(error.stack ? error.stack : error);
    });
