import { Apolloclient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/tinaylee/web3-rsvp:",
    cache: new InMemoryCache(),
});