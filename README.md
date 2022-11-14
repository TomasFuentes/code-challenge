This project contains two challenges - a "Ticket Breakdown" challenge and a "Refactoring" challenge. The two challenges are unrelated, but you should complete both in the same folder and share the link in Coderbyte. Any written answers should be included in markdown files within this folder.


## [Ticket Breakdown](Ticket_Breakdown.md)

## [Refactoring](Refactoring.md)

If you are a JS novice, here's how to get started:
1. [Install Node.js](https://nodejs.org/en/download/) (we use `^16`, the latest LTS)
2. Run `npm i` in this repo to install dependencies
3. Run `npm test` to run the automated tests
4. Run `npm start` to launch `index.js` for any manual testing


## Logic

I did a litte re organization of the code, more related with the grouping of it, I preffer to have sections of code grouped with one objetive, for example the change that I did on this if

```
    if (candidate) {
        if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
        }
    } else {
        candidate = TRIVIAL_PARTITION_KEY;
    }
```

As you can see, this If clause was doing an action between 2 different verifications, in one side, it was ensuring that the type of the input was the correct one, and in other, it was defining what happens if not input was given. So I preffer to have a more understandable tree of options by defining the general logic first (if an input is given) and then the more specific logic (the value for the candidate in each way). Like this:

```
    if (event) {
        candidate = event.partitionKey ? parsePartitionKey(event.partitionKey) : encodeData(event);

    } else {
        candidate = TRIVIAL_PARTITION_KEY;
    }

```

I also made some complementary functions to help the reader to understand the objetive of each part of the code, by using a declarative name like `encodeData`, `isNotValidEncondig`, `parsePartitionKey`, in that way, future developer can easely modify the code if something fails/changes.