require("dotenv").config();
const wordwrap = require("wordwrap");
const rssParser = require('rss-parser')
const {Octokit} = require("@octokit/rest");

const {
    GIST_ID: gistId,
    GH_TOKEN: githubToken,
    GOODREADS_LIST_ID: listId,
} = process.env;

const octokit = new Octokit({
    auth: `token ${githubToken}`
});

async function main() {
    const wrap = wordwrap(54);
    const currentlyReadingListName = `currently-reading`;

    try {
        const parser = new rssParser({
                customFields: {
                    item: ['user_shelves', `author_name`]
                }
            }
        );

        const feed = await parser.parseURL(`https://www.goodreads.com/review/list_rss/${listId}`);

        const reading = feed.items
            .sort(item => new Date(item.pubDate).getMilliseconds())
            .find(item => item.user_shelves === currentlyReadingListName);

        const read = feed.items
            .sort(item => new Date(item.pubDate).getMilliseconds())
            .find(item => !item.user_shelves);

        // Create data for currently reading; remove subtitle if it exists
        const currentlyReading = reading.title && reading.author_name
            ? `⏳ Currently reading: ${reading.title.split(':'[0])} by ${reading.author_name}`
            : `I'm not reading anything at the moment.\n`

        // Create data for recently read; remove subtitle if it exists
        const recentlyRead = read.title && read.author_name
            ? `☑️ Recently read: ${read.title.split(':')[0]} by ${read.author_name}`
            : `I haven't read anything recently.`

        // Update your gist
        await updateGist([wrap(currentlyReading), wrap('-'.repeat(52)), wrap(recentlyRead)]);
    } catch (error) {
        console.error(`Unable to fetch Goodreads books\n${error}`)
    }
}

async function updateGist(readingStatus) {

    let gist;
    try {
        gist = await octokit.gists.get({gist_id: gistId});
    } catch (error) {
        console.error(`Unable to get gist\n${error}`);
    }

    // Get original filename to update that same file
    const filename = Object.keys(gist.data.files)[0];

    // Only update if the content has changed
    if (gist.data.files[filename].content === readingStatus.join('\n')) {
        console.log(`Reading status hasn't changed; skipping update.`);
        return;
    }

    try {
        await octokit.gists.update({
            gist_id: gistId,
            files: {
                [filename]: {
                    filename,
                    content: readingStatus.join('\n'),
                }
            }
        });
    } catch (error) {
        console.error(`Unable to update gist\n${error}`);
    }
}

(async () => {
    await main();
})();
